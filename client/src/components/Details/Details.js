import {useContext, useEffect, useRef, useState} from 'react';
// import moment from 'moment';
import Loader from 'react-loader-spinner';
import * as postService from "../../services/postService";
import * as userService from "../../services/userService";
import Like from "../Like";
import Unlike from "../Unlike";
import FormComment from "../FormComment";
import Comment from "../Comment";
import notificationService from "../../services/notificationService";
import AuthContext from "../AuthContext";
import Edit from "../Edit/Edit";
import Delete from "../Delete";
import {useHistory} from "react-router-dom";

const Details = ({match}) => {
    const postId = match.params.id;
    let authorName = '';
    const isMounted = useRef(false)

    const {token, isLoggedIn, userId} = useContext(AuthContext);

    const [post, setPost] = useState({});
    // const [authorName, setAuthorName] = useState('');

    const history = useHistory();

    const like = () => {
        postService.likeById(post._id, token)
            .then(post => {
                // if (!isMounted.value) {
                    setPost(post);
                    notificationService.infoMsg('Liked');
                // }
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    const unlike = () => {
        postService.unlikeById(post._id, token)
            .then(post => {
                // if (!isMounted.value) {
                    setPost(post);
                    notificationService.infoMsg('Unliked');
                // }
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    const deleteComment = (commentId) => {
        postService.deleteCommentByIds(post._id, commentId, token)
            .then(post => {
                setPost(post)
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    const onNewComment = (comment) => {
        postService.commentById(postId, comment, token)
            .then(res => {
                setPost(res);
            })
            .catch(err => notificationService.errorMsg(err.message));
    }

    const onEditPost = () => {
        history.push('/post/create');
    }

    const onDeletePost = async () => {
        await postService.deleteById(postId, token)
            .then(() => {
                history.push('/');
            })
            .catch(err => notificationService.errorMsg(err.message))
    }

    const getPostById = () => {
        postService.getById(postId)
            .then(post => {
                return Promise.all([post, userService.getById(post.author)])
            }).then(([post, author]) => {
            authorName = author.displayName;
            setPost(post);
        })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    // useEffect(getPostById, [postId, post]);
    // useEffect(getPostById, []);

    useEffect(() => {
        getPostById();
        isMounted.current = true;
        return () => { isMounted.current = false }
    }, []);

    if (!post.hasOwnProperty('title')) {
        return (
            <div className="main-container">
                <Loader type="Rings" color="white" height={80} width={80}/>
            </div>
        )
    } else
        return (
            <div className="main-container">
                <section className="top-article">
                    <article className="top-article-image">
                        <img src={post.urlToImage} alt=""/>
                    </article>
                    <hr/>
                    <article className="top-article-details">
                        <span className="main-article-details-date">Date: {post.publishedAt}</span>
                        <span className="main-article-details-author">Author: {authorName}</span>
                        <span
                            className="main-article-details-comments">Comments: {post.comments.length || 0}</span>
                        <span
                            className="main-article-details-likes">Likes: {post.likes.length || 0}</span>
                        <span
                            className="main-article-details-readers">Visits: {post.visits}</span>
                        {
                            isLoggedIn
                                ?
                                !post.likes.some(x => x === userId)
                                    ? <Like onLike={like}/>
                                    : <Unlike onUnlike={unlike}/>
                                : null
                        }
                        {
                            post.author === userId
                                ?
                                <>
                                    <Edit onEdit={onEditPost}/>
                                    <Delete onDelete={onDeletePost}/>
                                </>
                                : null
                        }
                    </article>
                    <hr/>
                    <article className="top-article-description">
                        <h2 className="main-article-description-title">{post.title}</h2>
                        <p className="main-article-description-content">{post.content}</p>
                    </article>
                    {
                        isLoggedIn ?
                            <>
                                <hr/>
                                <article className="top-article-comment">
                                    <FormComment onNewComment={onNewComment}/>
                                </article>
                            </>
                            : null
                    }
                    <hr/>
                    <article className="top-article-comment-content">
                        {
                            post.comments.map((commentObj, index) => {
                                commentObj.index = index + 1;
                                return <Comment
                                    key={index + 1}
                                    data={commentObj}
                                    onDeleteComment={deleteComment}
                                />
                            })
                        }
                    </article>
                </section>
            </div>
        );
}

export default Details;

/*

 */