import EditPost from "../../components/EditPost";

const EditPostPage = (props) => {

    console.log('EditPostPage props', props);

    return (
        <EditPost {...props}/>
    );
}

export default EditPostPage;