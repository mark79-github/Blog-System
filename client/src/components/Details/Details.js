const Details = () => {
    return (
        // <main>
            <div className="main-container">
                <section className="top-article">
                    <article className="top-article-image">
                        <img src="/react.png" alt="react"/>
                    </article>
                    <hr/>
                    <article className="top-article-details">
                        <span className="main-article-details-date">15.03.2021</span>
                        <span className="main-article-details-author">Martin</span>
                        <span className="main-article-details-comments">Comments: 0</span>
                        <span className="main-article-details-likes">Likes: 0</span>
                        <span className="main-article-details-readers">Readers: 0</span>
                        <span className="main-article-details-thumb-up">
                                <i className="far fa-thumbs-up"></i>
                                Like</span>
                        <span className="main-article-details-thumb-down"><i
                            className="far fa-thumbs-down"></i>Unlike</span>
                    </article>
                    <hr/>
                    <article className="top-article-description">
                        <h2 className="main-article-description-title">Title</h2>
                        <p className="main-article-description-content">Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. A
                            beatae, consequatur consequuntur deserunt dignissimos distinctio explicabo facilis
                            ipsa laborum,
                            neque
                            porro quia quisquam ratione repudiandae similique voluptas voluptate voluptates,
                            voluptatibus!Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit. A
                            beatae, consequatur consequuntur deserunt dignissimos distinctio explicabo facilis
                            ipsa laborum,
                            neque
                            porro quia quisquam ratione repudiandae similique voluptas voluptate voluptates,
                            voluptatibus!</p>
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
        // </main>
    );
}

export default Details;