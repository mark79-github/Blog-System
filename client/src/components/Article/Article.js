import {Link} from "react-router-dom";

const Article = ({data}) => {
    const {_id, title, urlToImage} = data;
    return (
        <article className="article">
            <article className="article-image">
                <img src={urlToImage} alt="react"/>
            </article>
            <article className="article-description">
                <h2 className="article-description-title">{title}</h2>
                <button className="article-description-btn">
                    <Link to={`/post/${_id}`}>Read more</Link>
                </button>
            </article>
        </article>
    );
}

export default Article;