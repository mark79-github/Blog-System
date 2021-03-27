import {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import * as postService from "../../services/postService";
import * as userService from "../../services/userService";
import Like from "../Like";
import Unlike from "../Unlike";
import FormComment from "../FormComment";
import Comment from "../Comment";
import notificationService from "../../services/notificationService";
import AuthContext from "../AuthContext";

// class Details extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             post: {},
//         }
//     }
//
//     like = () => {
//         postService.likeById(this.state.post._id)
//             .then(post => {
//                 this.setState({post})
//                 notificationService.infoMsg('Liked');
//             })
//             .catch(err => console.error('Error:', err));
//     }
//
//     unlike = () => {
//         postService.unlikeById(this.state.post._id)
//             .then(post => {
//                 this.setState({post})
//                 notificationService.infoMsg('Unliked');
//             })
//             .catch(err => console.error('Error:', err));
//     }
//
//     componentDidMount() {
//         postService.getById(this.props.match.params.id)
//             .then(post => {
//                 return Promise.all([post, userService.getById(post.author)])
//             }).then(([post, author]) => {
//             post.authorName = author.displayName;
//             post.publishedAt = moment(post.publishedAt).format('DD.MM.YYYY hh:mm');
//             return this.setState({post});
//         })
//             .catch(err => console.error('Error:', err));
//     }
//
//     render() {
//         if (!this.state.post.title) {
//             return (
//                 <div className="main-container">
//                     <h2>Loading...</h2>
//                 </div>
//             )
//         } else
//             return (
//                 <div className="main-container">
//                     <section className="top-article">
//                         <article className="top-article-image">
//                             <img src={this.state.post.urlToImage} alt=""/>
//                         </article>
//                         <hr/>
//                         <article className="top-article-details">
//                             <span className="main-article-details-date">Date: {this.state.post.publishedAt}</span>
//                             <span className="main-article-details-author">Author: {this.state.post.authorName}</span>
//                             <span
//                                 className="main-article-details-comments">Comments: {this.state.post.comments.length || 0}</span>
//                             <span
//                                 className="main-article-details-likes">Likes: {this.state.post.likes.length || 0}</span>
//                             <span
//                                 className="main-article-details-readers">Views: {this.state.post.views}</span>
//                             {
//                                 !this.state.post.likes.some(x => x === this.state.post.author)
//                                     ? <Like onLike={this.like}/> : <Unlike onUnlike={this.unlike}/>
//                             }
//                         </article>
//                         <hr/>
//                         <article className="top-article-description">
//                             <h2 className="main-article-description-title">{this.state.post.title}</h2>
//                             <p className="main-article-description-content">{this.state.post.content}</p>
//                         </article>
//                         <hr/>
//                         <article className="top-article-comment">
//                             <FormComment commentId={this.state.post._id}/>
//                         </article>
//                         <hr/>
//                         <article className="top-article-comment-content">
//                             {this.state.post.comments.map((x, index) => {
//                                 x.index = index + 1;
//                                 return <Comment key={index + 1} data={x}/>
//                             })}
//                         </article>
//                     </section>
//                 </div>
//             );
//     }
// }

const Details = ({match}) => {
    const authContext = useContext(AuthContext);

    const [post, setPost] = useState({});
    const postId = match.params.id;

    const like = () => {
        postService.likeById(post._id, authContext.token)
            .then(post => {
                setPost(post)
                notificationService.infoMsg('Liked');
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    const unlike = () => {
        postService.unlikeById(post._id, authContext.token)
            .then(post => {
                setPost(post);
                notificationService.infoMsg('Unliked');
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    const deleteComment = () => {
        //TODO delete comment from post -> only the author can remove his own comment
    }

    useEffect(() => {
        postService.getById(postId)
            .then(post => {
                return Promise.all([post, userService.getById(post.author)])
            }).then(([post, author]) => {
            post.views = Number(post.views);
            post.authorName = author.displayName;
            post.publishedAt = moment(post.publishedAt).format('DD.MM.YYYY hh:mm');
            setPost(post);
        })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }, [post]);

    if (!post.hasOwnProperty('title')) {
        return (
            <div className="main-container">
                <Loader type="Rings" color="white" height={80} width={80} />
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
                        <span className="main-article-details-author">Author: {post.authorName}</span>
                        <span
                            className="main-article-details-comments">Comments: {post.comments.length || 0}</span>
                        <span
                            className="main-article-details-likes">Likes: {post.likes.length || 0}</span>
                        <span
                            className="main-article-details-readers">Views: {post.views}</span>
                        {
                            authContext.isLoggedIn
                                ?
                                !post.likes.some(x => x === post.author)
                                    ? <Like onLike={like}/>
                                    : <Unlike onUnlike={unlike}/>
                                : null
                        }
                    </article>
                    <hr/>
                    <article className="top-article-description">
                        <h2 className="main-article-description-title">{post.title}</h2>
                        <p className="main-article-description-content">{post.content}</p>
                    </article>
                    {
                        authContext.isLoggedIn ?
                            <>
                                <hr/>
                                <article className="top-article-comment">
                                    <FormComment postId={post._id} token={authContext.token}/>
                                </article>
                            </>
                            : null
                    }
                    <hr/>
                    <article className="top-article-comment-content">
                        {
                            post.comments.map((x, index) => {
                                x.index = index + 1;
                                return <Comment
                                    key={index + 1}
                                    data={x}
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