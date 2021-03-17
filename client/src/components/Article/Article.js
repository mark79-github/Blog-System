const Article = ({id, title, urlToImage}) => {
    const href = `/blog/${id}`;
    return (
        <article className="article">
            <article className="article-image">
                <img src={urlToImage} alt="react"/>
            </article>
            <article className="article-description">
                <h2 className="article-description-title">{title}</h2>
                <button className="article-description-btn">
                    <a href={href}>Read more</a>
                </button>
            </article>
        </article>
    );
}

export default Article;