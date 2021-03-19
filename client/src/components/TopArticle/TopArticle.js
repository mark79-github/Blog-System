const TopArticle = ({data}) => {
    const {id, title, content, author, urlToImage, publishedAt, likes, comments, readers} = data;
    return (
        <section className="top-article">
            <article className="top-article-image">
                <img src={urlToImage} alt=""/>
            </article>
            <article className="top-article-details">
                <span className="top-article-details-date">{publishedAt}</span>
                <span className="top-article-details-author">{author}</span>
                <span className="top-article-details-comments">Comments: {comments || 0}</span>
                <span className="top-article-details-likes">Likes: {likes || 0}</span>
                <span className="top-article-details-readers">Readers: {readers || 0}</span>
            </article>
            <article className="top-article-description">
                <h2 className="top-article-description-title">{title}</h2>
                <p className="top-article-description-content">{content}</p>
                <button className="article-description-btn"><a href={`/post/${id}`}>Read more</a>
                </button>
            </article>
        </section>
    );
}

export default TopArticle;