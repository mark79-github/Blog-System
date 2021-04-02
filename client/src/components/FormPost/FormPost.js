const FormPost = ({data, onSubmitFormHandler}) => {

    return (
        <form className="form" onSubmit={onSubmitFormHandler}>
            <input type="text" name="title" placeholder="Title" defaultValue={data.title}/>
            <textarea name="content" placeholder="Content" defaultValue={data.content}/>
            <input type="text" name="urlToImage" placeholder="Image url" defaultValue={data.urlToImage}/>
            <input type="submit" value="Save"/>
        </form>
    );
}

export default FormPost;