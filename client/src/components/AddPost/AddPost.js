import FormPost from "../FormPost";

const AddPost = () => {
    return (
        <div className="main-container">
            <section className="form-container">
                <h2 className="form-container-title post">Create Post</h2>
                <FormPost/>
            </section>
        </div>
    );
}

export default AddPost;