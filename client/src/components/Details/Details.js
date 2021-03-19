import {Component} from 'react';
import * as postService from "../../services/postService";

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
        }
    }

    componentDidMount() {
        postService.getById(this.props.match.params.id)
            .then(post => this.setState({post}))
            .catch(err => console.error('Error:', err));
    }


    render() {
        return (
            <div className="main-container">
                <section className="top-article">
                    <article className="top-article-image">
                        <img src={this.state.post.urlToImage} alt="Image"/>
                    </article>
                    <hr/>
                    <article className="top-article-details">
                        <span className="main-article-details-date">{this.state.post.publishedAt}</span>
                        <span className="main-article-details-author">{this.state.post.author}</span>
                        <span className="main-article-details-comments">Comments: {this.state.post.comments || 0}</span>
                        <span className="main-article-details-likes">Likes: {this.state.post.likes || 0}</span>
                        <span className="main-article-details-readers">Readers: {this.state.post.readers || 0}</span>
                        <span className="main-article-details-thumb-up"><i className="far fa-thumbs-up"></i>Like</span>
                        <span className="main-article-details-thumb-down"><i
                            className="far fa-thumbs-down"></i>Unlike</span>
                    </article>
                    <hr/>
                    <article className="top-article-description">
                        <h2 className="main-article-description-title">{this.state.post.title}</h2>
                        <p className="main-article-description-content">{this.state.post.content}</p>
                    </article>
                    <hr/>
                    <article className="top-article-comment">
                        <form action="#">
                            <label htmlFor="comment">Comment: </label>
                            <textarea name="comment" id="comment" cols="30" rows="10"
                                      placeholder="Leave your comment..."/>
                            <input type="submit" value="Post comment"/>
                        </form>
                    </article>
                    <hr/>
                    <article className="top-article-comment-content">
                        <article className="main-article-comment-content-details">
                            <p><i className="far fa-trash-alt"></i><span>#1</span><span>By Author</span>
                            </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda,
                                cum deleniti dolorum
                                ducimus
                                mollitia nobis possimus quam sunt voluptas?</p>
                        </article>
                        <article className="main-article-comment-content-details">
                            <p><i className="far fa-trash-alt"></i><span>#2</span><span>By Different Author</span>
                            </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, quas.</p>
                        </article>
                    </article>
                </section>
            </div>
        );
    }
}

export default Details;