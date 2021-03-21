import {Link} from 'react-router-dom';
import moment from "moment";

const TopArticle = ({data}) => {
    let {_id, title, content, author, urlToImage, publishedAt, likes, comments, readers} = data;
    publishedAt = moment(publishedAt).format('DD.MM.YYYY hh:mm');
    return (
        <section className="top-article">
            <article className="top-article-image">
                <img src={urlToImage} alt=""/>
            </article>
            <article className="top-article-details">
                <span className="top-article-details-date">{publishedAt}</span>
                <span className="top-article-details-author">{author}</span>
                <span className="top-article-details-comments">Comments: {comments.length || 0}</span>
                <span className="top-article-details-likes">Likes: {likes.length || 0}</span>
                <span className="top-article-details-readers">Readers: {readers.length || 0}</span>
            </article>
            <article className="top-article-description">
                <h2 className="top-article-description-title">{title}</h2>
                <p className="top-article-description-content">{content}</p>
                <button className="article-description-btn">
                    <Link to={`/post/${_id}`}>Read more</Link>
                </button>
            </article>
        </section>
    );
}

export default TopArticle;