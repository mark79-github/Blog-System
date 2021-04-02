import AddPost from "../../components/AddPost";

const CreatePostPage = () => {
    const post = {
        title: '',
        content: '',
        urlToImage: ''
    }

    return (
        <AddPost data={post}/>
    );
}

export default CreatePostPage;