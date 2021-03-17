import NavigationItem from "../NavigationItem";

const Main = () =>{
    return (
        <div className="main-container">
            <section className="top-article">
                <article className="top-article-image">
                    <img src="/react.png" alt="react"/>
                </article>
                <article className="top-article-details">
                    <span className="top-article-details-date">15.03.2021</span>
                    <span className="top-article-details-author">Martin</span>
                    <span className="top-article-details-comments">Comments: 0</span>
                    <span className="top-article-details-likes">Likes: 0</span>
                    <span className="top-article-details-readers">Readers: 0</span>
                </article>
                <article className="top-article-description">
                    <h2 className="top-article-description-title">Title</h2>
                    <p className="top-article-description-content">Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. A
                        beatae, consequatur consequuntur deserunt dignissimos distinctio explicabo facilis ipsa laborum,
                        neque
                        porro quia quisquam ratione repudiandae similique voluptas voluptate voluptates,
                        voluptatibus!</p>
                    <button className="article-description-btn"><a href="/blog/1234">Read more</a>
                    </button>
                </article>
            </section>
            <section className="sub-article">
                <article className="article">
                    <article className="article-image">
                        <img src="/react.png" alt="react"/>
                    </article>
                    <article className="article-description">
                        <h2 className="article-description-title">Title</h2>
                        <button className="article-description-btn">
                            <a href="./article-detail-view.html">Read more</a>
                        </button>
                    </article>
                </article>
                <article className="article">
                    <article className="article-image">
                        <img src="/react.png" alt="react"/>
                    </article>
                    <article className="article-description">
                        <h2 className="article-description-title">Title</h2>
                        <button className="article-description-btn">
                            <a href="./article-detail-view.html">Read more</a>
                        </button>
                    </article>
                </article>
            </section>
        </div>
    );
}

export default Main;