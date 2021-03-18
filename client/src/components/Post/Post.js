const Post = () =>{
    return (
        <div className="main-container">
            <section className="form-container">
                <h2 className="form-container-title post">Create Post</h2>
                <form action="#" className="form">
                    <input type="text" name="title" placeholder="Title"/>
                    <textarea name="content" cols="30" rows="10" placeholder="Content"/>
                    <input type="text" name="urlToImage" placeholder="Image url"/>
                    <input type="submit" value="Create"/>
                </form>
            </section>
        </div>
    );
}

export default Post;