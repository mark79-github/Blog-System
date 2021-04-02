import {Component} from 'react';
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
import Edit from "../Edit";
import Delete from "../Delete";

// const Details = ({match}) => {
//     const postId = match.params.id;
//     let authorName = '';
//     const isMounted = useRef(false)
//
//     const {token, isLoggedIn, userId} = useContext(AuthContext);
//
//     const [post, setPost] = useState({});
//     // const [authorName, setAuthorName] = useState('');
//
//     const history = useHistory();
//
//     const like = () => {
//         postService.likeById(post._id, token)
//             .then(post => {
//                 // if (!isMounted.value) {
//                     setPost(post);
//                     notificationService.infoMsg('Liked');
//                 // }
//             })
//             .catch(err => {
//                 notificationService.errorMsg(err.message)
//             });
//     }
//
//     const unlike = () => {
//         postService.unlikeById(post._id, token)
//             .then(post => {
//                 // if (!isMounted.value) {
//                     setPost(post);
//                     notificationService.infoMsg('Unliked');
//                 // }
//             })
//             .catch(err => {
//                 notificationService.errorMsg(err.message)
//             });
//     }
//
//     const deleteComment = (commentId) => {
//         postService.deleteCommentByIds(post._id, commentId, token)
//             .then(post => {
//                 setPost(post)
//             })
//             .catch(err => {
//                 notificationService.errorMsg(err.message)
//             });
//     }
//
//     const onNewComment = (comment) => {
//         postService.commentById(postId, comment, token)
//             .then(res => {
//                 setPost(res);
//             })
//             .catch(err => notificationService.errorMsg(err.message));
//     }
//
//     const onEditPost = () => {
//         history.push('/post/create');
//     }
//
//     const onDeletePost = async () => {
//         await postService.deleteById(postId, token)
//             .then(() => {
//                 history.push('/');
//             })
//             .catch(err => notificationService.errorMsg(err.message))
//     }
//
//     const getPostById = () => {
//         postService.getById(postId)
//             .then(post => {
//                 return Promise.all([post, userService.getById(post.author)])
//             }).then(([post, author]) => {
//             authorName = author.displayName;
//             setPost(post);
//         })
//             .catch(err => {
//                 notificationService.errorMsg(err.message)
//             });
//     }
//
//     // useEffect(getPostById, [postId, post]);
//     // useEffect(getPostById, []);
//
//     useEffect(() => {
//         getPostById();
//         isMounted.current = true;
//         return () => { isMounted.current = false }
//     }, []);
//
//     if (!post.hasOwnProperty('title')) {
//         return (
//             <div className="main-container">
//                 <Loader type="Rings" color="white" height={80} width={80}/>
//             </div>
//         )
//     } else
//         return (
//             <div className="main-container">
//                 <section className="top-article">
//                     <article className="top-article-image">
//                         <img src={post.urlToImage} alt=""/>
//                     </article>
//                     <hr/>
//                     <article className="top-article-details">
//                         <span className="main-article-details-date">Date: {post.publishedAt}</span>
//                         <span className="main-article-details-author">Author: {authorName}</span>
//                         <span
//                             className="main-article-details-comments">Comments: {post.comments.length || 0}</span>
//                         <span
//                             className="main-article-details-likes">Likes: {post.likes.length || 0}</span>
//                         <span
//                             className="main-article-details-readers">Visits: {post.visits}</span>
//                         {
//                             isLoggedIn
//                                 ?
//                                 !post.likes.some(x => x === userId)
//                                     ? <Like onLike={like}/>
//                                     : <Unlike onUnlike={unlike}/>
//                                 : null
//                         }
//                         {
//                             post.author === userId
//                                 ?
//                                 <>
//                                     <Edit onEdit={onEditPost}/>
//                                     <Delete onDelete={onDeletePost}/>
//                                 </>
//                                 : null
//                         }
//                     </article>
//                     <hr/>
//                     <article className="top-article-description">
//                         <h2 className="main-article-description-title">{post.title}</h2>
//                         <p className="main-article-description-content">{post.content}</p>
//                     </article>
//                     {
//                         isLoggedIn ?
//                             <>
//                                 <hr/>
//                                 <article className="top-article-comment">
//                                     <FormComment onNewComment={onNewComment}/>
//                                 </article>
//                             </>
//                             : null
//                     }
//                     <hr/>
//                     <article className="top-article-comment-content">
//                         {
//                             post.comments.map((commentObj, index) => {
//                                 commentObj.index = index + 1;
//                                 return <Comment
//                                     key={index + 1}
//                                     data={commentObj}
//                                     onDeleteComment={deleteComment}
//                                 />
//                             })
//                         }
//                     </article>
//                 </section>
//             </div>
//         );
// }

class Details extends Component {
    constructor(props) {
        super(props);

        this.authorName = '';
        this._isMounted = false;

        this.state = {
            post: {},
            loading: true,
        };
    }

    like = () => {
        postService.likeById(this.state.post._id, this.props.token)
            .then(post => {
                // if (!isMounted.value) {
                this.setState({post});
                notificationService.infoMsg('Liked');
                // }
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    unlike = () => {
        postService.unlikeById(this.state.post._id, this.props.token)
            .then(post => {
                // if (!isMounted.value) {
                this.setState({post});
                notificationService.infoMsg('Unliked');
                // }
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    deleteComment = (commentId) => {
        postService.deleteCommentByIds(this.state.post._id, commentId, this.props.token)
            .then(post => {
                this.setState({post});
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    onNewComment = (comment) => {
        postService.commentById(this.state.post._id, comment, this.props.token)
            .then(post => {
                this.setState({post});
            })
            .catch(err => notificationService.errorMsg(err.message));
    }

    onEditPost = () => {
        console.log('test editPost');

        // this.props.history.push('/post/edit');

        this.props.history.push({
            pathname: '/post/edit',
            search: '',  // query string
            asd: {  // location state
                title: this.state.post.title,
                content: this.state.post.content,
                urlToImage: this.state.post.urlToImage,
            },
        });
    }

    onDeletePost = async () => {
        await postService.deleteById(this.state.post._id, this.props.token)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => notificationService.errorMsg(err.message))
    }

    getPostById = (postId) => {
        postService.getById(postId)
            .then(post => {
                return Promise.all([post, userService.getById(post.author)])
            }).then(([post, author]) => {
            if (this._isMounted) {
                this.authorName = author.displayName;
                this.setState({
                    post,
                    loading: false
                });

            }
        })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Details.js prevState.post.visits', prevState.post.visits);
        console.log('Details.js this.state.post.visits', this.state.post.visits);
    }

    componentDidMount() {
        this._isMounted = true;
        console.log(this.props);
        this.getPostById(this.props.match.params.id);
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="main-container">
                    <Loader type="Rings" color="white" height={80} width={80}/>
                </div>
            )
        }
        // if (Object.keys(this.state.post).length === 0) {
        //     return (
        //         <div className="main-container">
        //             <Loader type="Rings" color="white" height={80} width={80}/>
        //         </div>
        //     )
        // }

        return (
            <div className="main-container">
                <section className="top-article">
                    <article className="top-article-image">
                        <img src={this.state.post.urlToImage} alt=""/>
                    </article>
                    <hr/>
                    <article className="top-article-details">
                        <span className="main-article-details-date">Date: {this.state.post.publishedAt}</span>
                        <span className="main-article-details-author">Author: {this.authorName}</span>
                        <span
                            className="main-article-details-comments">Comments: {this.state.post.comments.length || 0}</span>
                        <span
                            className="main-article-details-likes">Likes: {this.state.post.likes.length || 0}</span>
                        <span
                            className="main-article-details-readers">Visits: {this.state.post.visits}</span>
                        {
                            this.props.isLoggedIn
                                ?
                                !this.state.post.likes.some(x => x === this.props.userId)
                                    ? <Like onLike={this.like}/>
                                    : <Unlike onUnlike={this.unlike}/>
                                : null
                        }
                        {
                            this.state.post.author === this.props.userId
                                ?
                                <>
                                    <Edit onEdit={this.onEditPost}/>
                                    <Delete onDelete={this.onDeletePost}/>
                                </>
                                : null
                        }
                    </article>
                    <hr/>
                    <article className="top-article-description">
                        <h2 className="main-article-description-title">{this.state.post.title}</h2>
                        <p className="main-article-description-content">{this.state.post.content}</p>
                    </article>
                    {
                        this.props.isLoggedIn ?
                            <>
                                <hr/>
                                <article className="top-article-comment">
                                    <FormComment onNewComment={this.onNewComment}/>
                                </article>
                            </>
                            : null
                    }
                    <hr/>
                    <article className="top-article-comment-content">
                        {
                            this.state.post.comments.map((commentObj, index) => {
                                commentObj.index = index + 1;
                                return <Comment
                                    key={index + 1}
                                    data={commentObj}
                                    onDeleteComment={this.deleteComment}
                                />
                            })
                        }
                    </article>
                </section>
            </div>
        );
    }
}

const DetailsWithContext = (props) => (
    <AuthContext.Consumer>
        {({isLoggedIn, userId, token}) => (
            <>
                <h1>{isLoggedIn ? "TRUE" : "FALSE"}</h1>
                <Details {...props} isLoggedIn={isLoggedIn} userId={userId} token={token}/>
            </>

        )}
    </AuthContext.Consumer>
);

export default DetailsWithContext;

/*

 */