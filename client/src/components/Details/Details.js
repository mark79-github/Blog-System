import {Component} from 'react';
import moment from 'moment';
import * as postService from "../../services/postService";
import * as userService from "../../services/userService";
import Like from "../Like";
import Unlike from "../Unlike";
import FormComment from "../FormComment";
import Comment from "../Comment";

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
        }
    }

    like = () => {
        postService.likeById(this.state.post._id)
            .then(post => this.setState({post}))
            .catch(err => console.error('Error:', err));
    }

    unlike = () => {
        postService.unlikeById(this.state.post._id)
            .then(post => this.setState({post}))
            .catch(err => console.error('Error:', err));
    }

    componentDidMount() {
        postService.getById(this.props.match.params.id)
            .then(post => {
                return Promise.all([post, userService.getById(post.author)])
            }).then(([post, author]) => {
            post.authorName = author.displayName;
            post.publishedAt = moment(post.publishedAt).format('DD.MM.YYYY hh:mm');
            return this.setState({post});
        })
            .catch(err => console.error('Error:', err));
    }

    render() {
        if (!this.state.post.title) {
            return (
                <div className="main-container">
                    <h2>Loading...</h2>
                </div>
            )
        } else
            return (
                <div className="main-container">
                    <section className="top-article">
                        <article className="top-article-image">
                            <img src={this.state.post.urlToImage} alt=""/>
                        </article>
                        <hr/>
                        <article className="top-article-details">
                            <span className="main-article-details-date">Date: {this.state.post.publishedAt}</span>
                            <span className="main-article-details-author">Author: {this.state.post.authorName}</span>
                            <span
                                className="main-article-details-comments">Comments: {this.state.post.comments.length || 0}</span>
                            <span
                                className="main-article-details-likes">Likes: {this.state.post.likes.length || 0}</span>
                            <span
                                className="main-article-details-readers">Readers: {this.state.post.readers.length || 0}</span>
                            {
                                !this.state.post.likes.some(x => x === this.state.post.author)
                                    ? <Like onLike={this.like}/> : <Unlike onUnlike={this.unlike}/>
                            }
                        </article>
                        <hr/>
                        <article className="top-article-description">
                            <h2 className="main-article-description-title">{this.state.post.title}</h2>
                            <p className="main-article-description-content">{this.state.post.content}</p>
                        </article>
                        <hr/>
                        <article className="top-article-comment">
                            <FormComment commentId={this.state.post._id}/>
                        </article>
                        <hr/>
                        <article className="top-article-comment-content">
                            {this.state.post.comments.map((x, index) => {
                                x.index = index + 1;
                                return <Comment key={index + 1} data={x}/>
                            })}
                        </article>
                    </section>
                </div>
            );
    }
}

export default Details;