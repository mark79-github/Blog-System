import EditPost from "../../components/EditPost";

const EditPostPage = (props) => {

    console.log('EditPostPage : ', props);

    const post = {
        title: props.title,
        content: props.content,
        urlToImage: props.urlToImage,
    }
    return (
        <EditPost data={post}/>
    );
}

export default EditPostPage;