import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';
import Loader from 'react-loader-spinner';

import * as postService from '../../services/postService';
import * as userService from '../../services/userService';

import styles from './Details.module.css';
import AuthContext from '../../contexts';

import Like from '../Icons/Like';
import Unlike from '../Icons/Unlike';
import FormComment from '../FormComment';
import Comment from '../Comment';
import Edit from '../Icons/Edit';
import Delete from '../Icons/Delete';
import Comments from '../Icons/Comment';

const Details = () => {
    const {isLoggedIn, userId, token} = useContext(AuthContext);
    const navigate = useNavigate();
    const {id} = useParams();

    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [publishedAt, setPublishedAt] = useState("");
    const [hideComments, setHideComments] = useState(false);

    useEffect(() => {
        let abort = false;

        async function load() {
            const postData = await postService.getById(id);
            if (abort) return;

            const authorData = await userService.getById(postData.author);
            if (abort) return;

            setPost(postData);
            setAuthor(authorData);
            setPublishedAt(moment(postData.publishedAt).format('DD.MM.YYYY HH:mm'));
        }

        load();

        return () => {
            abort = true;
        };
    }, [id]);

    const like = () => {
        postService.likeById(post._id, token).then(setPost);
    }

    const unlike = () => {
        postService.unlikeById(post._id, token).then(setPost);
    }

    const deleteComment = (commentId) => {
        postService.deleteCommentByIds(post._id, commentId, token).then(setPost);
    }

    const onNewComment = (comment) => {
        postService.commentById(post._id, comment, token).then(setPost);
    }

    const onEditPost = () => {
        navigate(`/post/${post._id}/edit`);
    }

    const onDeletePost = async () => {
        await postService.deleteById(post._id, token);
        navigate('/');
    }

    if (!post || !author) {
        return (
            <main className={styles.container}>
                <Loader type="Rings" color="white" height={80} width={80}/>
            </main>
        )
    }

    return (
        <main className={styles.container}>
            <section className={styles.article}>
                <article className={styles.wrapper}>
                    <img className={styles.img} src={post.urlToImage} alt=""/>
                </article>
                <article>
                    <h2 className={styles.title}>{post.title}</h2>
                    <p className={styles.content}>{post.content}</p>
                </article>
                <article className={`${styles.details} ${!hideComments && post.comments.length ? styles.border : ''}`}>

                    <article className={styles.info}>
                        <div>
                            <span>Published: </span>
                            {publishedAt}
                        </div>
                        <div className={styles.author}>
                            <span>Post author: </span>
                            <Link to={`/user/${post.author}`} className={styles.link}>
                                {author.displayName}
                            </Link>
                        </div>
                        <div>
                            <span>Comments: </span>
                            {post.comments.length}
                        </div>
                        <div>
                            <span>Likes: </span>
                            {post.likes.length}
                        </div>
                        <div>
                            <span>Views: </span>
                            {post.visits}
                        </div>
                    </article>

                    <article className={styles.icons}>
                        <Comments onClick={() => setHideComments((s) => !s)}/>

                        {post.author === userId && (
                            <>
                                <Edit onEdit={onEditPost}/>
                                <Delete onDelete={onDeletePost}/>
                            </>
                        )}

                        {isLoggedIn && (
                            <div>
                                {post.likes.includes(userId)
                                    ? <Unlike onUnlike={unlike}/>
                                    : <Like onLike={like}/>}
                            </div>
                        )}
                    </article>

                </article>

                {hideComments && (
                    <article className={styles.comment}>

                        {post.comments.length > 0 && (
                            <>
                                <h2 className={styles.header}>Comments:</h2>
                                {post.comments.map((commentObj, index) => (
                                    <Comment
                                        key={index}
                                        data={{...commentObj, index: index + 1}}
                                        onDeleteComment={deleteComment}
                                    />
                                ))}
                            </>
                        )}

                        {isLoggedIn && (
                            <article className={styles.comment}>
                                <FormComment onNewComment={onNewComment}/>
                            </article>
                        )}

                    </article>
                )}

            </section>
        </main>
    );
}

export default Details;
