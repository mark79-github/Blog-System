import {Link} from 'react-router-dom';
import moment from "moment";

const TopArticle = ({data}) => {
    let {_id, title, content, author, urlToImage, publishedAt, likes, comments, visits} = data;
    publishedAt = moment(publishedAt).format('DD.MM.YYYY hh:mm');

    const handleClick = () => {
        fetch(`http://localhost:5000/api/posts/view/${_id}`, {
            method: "POST",
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error));
    }

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
                <span className="top-article-details-readers">Visits: {visits}</span>
            </article>
            <article className="top-article-description">
                <h2 className="top-article-description-title">{title}</h2>
                <p className="top-article-description-content">{content}</p>
                <Link to={`/post/${_id}`}>
                    <button className="article-description-btn" onClick={handleClick}>
                        Read more
                    </button>
                </Link>
            </article>
        </section>
    );
}

export default TopArticle;