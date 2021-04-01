import AddPost from "../../components/AddPost";

const CreatePostPage = () => {
    const post = {
        title: '1',
        content: '2',
        urlToImage: '3'
    }
    return (
        <AddPost data={post}/>
    );
}

export default CreatePostPage;