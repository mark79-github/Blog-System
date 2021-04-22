import {Component} from 'react';
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
import Avatar from '../Icons/Avatar';


class Details extends Component {
    constructor(props) {
        super(props);

        this.authorName = '';
        this.avatarImageUrl = '';
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
            });
    }

    unlike = () => {
        postService.unlikeById(this.state.post._id, this.props.token)
            .then(post => {
                this.setState({post});
            });
    }

    deleteComment = (commentId) => {
        postService.deleteCommentByIds(this.state.post._id, commentId, this.props.token)
            .then(post => {
                this.setState({post});
            });
    }

    onNewComment = (comment) => {
        postService.commentById(this.state.post._id, comment, this.props.token)
            .then(post => {
                this.setState({post});
            });
    }

    onEditPost = () => {
        this.props.history.push(`/post/${this.state.post._id}/edit`);
    }

    onDeletePost = async () => {
        await postService.deleteById(this.state.post._id, this.props.token)
            .then(() => {
                this.props.history.push('/');
            });
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
                this.avatarImageUrl = author.avatarImageUrl;
                this.publishedAt = moment(post.publishedAt).format('DD.MM.YYYY hh:mm');
                this.setState({post});
            }
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
                <main className={styles.container}>
                    <Loader type="Rings" color="white" height={80} width={80}/>
                </main>
            )
        }

        return (
            <main className={styles.container}>
                <section className={styles.article}>
                    <article className={styles.wrapper}>
                        <img className={styles.img} src={this.state.post.urlToImage} alt=""/>
                    </article>
                    <article>
                        <h2 className={styles.title}>{this.state.post.title}</h2>
                        <p className={styles.content}>{this.state.post.content}</p>
                    </article>
                    <article
                        className={`${styles.details} ${!this.state.hideComments && !!this.state.post.comments.length ? styles.border : ''}`}>
                        <article className={styles.info}>
                            <div>
                                <span>Published: </span>
                                {this.publishedAt}
                            </div>
                            <div className={styles.author}>
                                <span>Post author: </span>
                                {this.authorName}
                                <Avatar img={this.avatarImageUrl}/>
                            </div>
                            <div>
                                <span>Comments: </span>
                                {this.state.post.comments.length}
                            </div>
                            <div>
                                <span>Likes: </span>
                                {this.state.post.likes.length}
                            </div>
                            <div>
                                <span>Views: </span>
                                {this.state.post.visits}
                            </div>
                        </article>

                        <article className={styles.icons}>
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
                                    <div>
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
                            : <article className={styles.comment}>
                                <article>
                                    {
                                        this.state.post.comments.length > 0
                                            ?
                                            <>
                                                <h2 className={styles.header}>Comments:</h2>
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
                                            <article className={styles.comment}>
                                                <FormComment onNewComment={this.onNewComment}/>
                                            </article>
                                        </>
                                        : null
                                }
                            </article>
                    }
                </section>
            </main>
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

