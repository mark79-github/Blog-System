import {Component} from 'react';
import moment from 'moment';
import Loader from 'react-loader-spinner';

import * as postService from '../../services/postService';
import * as userService from '../../services/userService';
import notificationService from '../../services/notificationService';

import AuthContext from '../AuthContext';

import Like from '../Icons/Like';
import Unlike from '../Icons/Unlike';
import FormComment from '../FormComment';
import Comment from '../Comment';
import Edit from '../Icons/Edit';
import Delete from '../Icons/Delete';
import Comments from '../Icons/Comment';

class Details extends Component {
    constructor(props) {
        super(props);

        this.authorName = '';
        this.publishedAt = new Date().toDateString();
        this._isMounted = false;

        this.state = {
            post: {},
            hideComments: true
        };
    }

    like = () => {
        postService.likeById(this.state.post._id, this.props.token)
            .then(post => {
                this.setState({post});
                notificationService.infoMsg('Liked');
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            });
    }

    unlike = () => {
        postService.unlikeById(this.state.post._id, this.props.token)
            .then(post => {
                this.setState({post});
                notificationService.infoMsg('Unliked');
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
        this.props.history.push(`/post/${this.state.post._id}/edit`);
    }

    onDeletePost = async () => {
        await postService.deleteById(this.state.post._id, this.props.token)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(err => notificationService.errorMsg(err.message))
    }

    showComments = () => {
        this.setState(prevState => ({
            ...prevState,
            hideComments: !prevState.hideComments
        }));
    }

    getPostById = (postId) => {
        postService.getById(postId)
            .then(post => {
                return Promise.all([post, userService.getById(post.author)])
            }).then(([post, author]) => {
            if (this._isMounted) {
                this.authorName = author.displayName;
                this.publishedAt = moment(post.publishedAt).format('DD.MM.YYYY hh:mm');
                this.setState({
                    post
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

    componentDidMount() {
        this._isMounted = true;
        this.getPostById(this.props.match.params.id);
    }

    render() {

        if (Object.keys(this.state.post).length === 0) {
            return (
                <div className="main-container">
                    <Loader type="Rings" color="white" height={80} width={80}/>
                </div>
            )
        }

        return (
            <div className="main-container">
                <section className="top-article">
                    <article className="top-article-image">
                        <img src={this.state.post.urlToImage} alt=""/>
                    </article>
                    <article className="top-article-description">
                        <h2 className="main-article-description-title">{this.state.post.title}</h2>
                        <p className="main-article-description-content">{this.state.post.content}</p>
                    </article>
                    <article className="top-article-details">

                        <article className="top-article-details-info">
                            <div className="main-article-details-date">
                                <span>Published: </span>
                                {this.publishedAt}
                            </div>
                            <div className="main-article-details-author">
                                <span>Post author: </span>
                                {this.authorName}
                            </div>
                            <div className="main-article-details-comments">
                                <span>Comments: </span>
                                {this.state.post.comments.length}
                            </div>
                            <div className="main-article-details-likes">
                                <span>Likes: </span>
                                {this.state.post.likes.length}
                            </div>
                            <div className="main-article-details-readers">
                                <span>Views: </span>
                                {this.state.post.visits}
                            </div>
                        </article>

                        <article className="top-article-details-icon-wrapper">
                            <Comments onClick={this.showComments}/>
                            {
                                this.state.post.author === this.props.userId
                                    ?
                                    <>
                                        <Edit onEdit={this.onEditPost}/>
                                        <Delete onDelete={this.onDeletePost}/>
                                    </>
                                    : null
                            }

                            {
                                this.props.isLoggedIn
                                    ?
                                    <div className="main-article-details-likes-icons">
                                        {
                                            !this.state.post.likes.some(x => x === this.props.userId)
                                                ? <Like onLike={this.like}/>
                                                : <Unlike onUnlike={this.unlike}/>
                                        }
                                    </div>
                                    : null
                            }

                        </article>

                    </article>
                    {
                        this.state.hideComments
                            ? null
                            : <article className="top-article-comment">
                                <article className="top-article-comment-content">
                                    {
                                        this.state.post.comments.length > 0
                                            ?
                                            <>
                                                <h2 className="top-article-comment-content-header">Comments:</h2>
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
                                            </>
                                            : null

                                    }
                                </article>
                                {
                                    this.props.isLoggedIn ?
                                        <>
                                            <article className="top-article-comment">
                                                <FormComment onNewComment={this.onNewComment}/>
                                            </article>
                                        </>
                                        : null
                                }
                            </article>
                    }
                </section>
            </div>
        );
    }
}

const DetailsWithContext = (props) => (
    <AuthContext.Consumer>
        {({isLoggedIn, userId, token}) => (
            <Details {...props} isLoggedIn={isLoggedIn} userId={userId} token={token}/>
        )}
    </AuthContext.Consumer>
);

export default DetailsWithContext;

