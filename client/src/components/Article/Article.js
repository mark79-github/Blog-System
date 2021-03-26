import {Link} from "react-router-dom";

const Article = ({data}) => {
    const {_id, title, urlToImage} = data;

    const handleClick = () => {
        fetch(`http://localhost:5000/api/posts/view/${_id}`, {
            method: "POST",
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error));
    }

    return (
        <article className="article">
            <article className="article-image">
                <img src={urlToImage} alt="react"/>
            </article>
            <article className="article-description">
                <h2 className="article-description-title">{title}</h2>
                <Link to={`/post/${_id}`}>
                    <button className="article-description-btn" onClick={handleClick}>
                        Read more
                    </button>
                </Link>
            </article>
        </article>
    );
}

export default Article;