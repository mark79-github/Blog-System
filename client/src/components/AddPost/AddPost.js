import FormPost from "../FormPost";

const AddPost = ({data}) => {
    return (
        <div className="main-container">
            <section className="form-container">
                <h2 className="form-container-title post">Create Post</h2>
                <FormPost data={data}/>
            </section>
        </div>
    );
}

export default AddPost;