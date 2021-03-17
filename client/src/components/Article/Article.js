const Article = (props) => {
    console.log('props', props);
    return (
        <article className="article">
            <article className="article-image">
                <img src={props.urlToImage} alt="react"/>
            </article>
            <article className="article-description">
                <h2 className="article-description-title">Title</h2>
                <button className="article-description-btn">
                    <a href="./article-detail-view.html">Read more</a>
                </button>
            </article>
        </article>
    );
}

export default Article;