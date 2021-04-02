import FormPost from "../FormPost";
import notificationService from "../../services/notificationService";
import * as postService from "../../services/postService";
import AuthContext from "../AuthContext";
import {useContext} from "react";
import {useHistory} from "react-router-dom";

const AddPost = ({data}) => {
    const {token} = useContext(AuthContext);
    const history = useHistory();

    const addPost = (event) => {
        event.preventDefault();

        let title = event.target.title.value;
        let content = event.target.content.value;
        let urlToImage = event.target.urlToImage.value;

        if (!validateInput(title, content, urlToImage)) {
            notificationService.errorMsg('Provided data is not valid')
            return
        }

        postService.addPost(title, content, urlToImage, token)
            .then(() => {
                history.push('/');
            })
            .catch(err => console.error("Error: ", err))
    }

    const notifications = {
        titleRequired: "Title is must be at least ten characters long",
        contentRequired: "Title is must be at least twenty characters long",
        urlToImageRequired: "Url To Image must be valid url",
    };

    const validateInput = (title, content, urlToImage) => {

        let isValid = true;
        const errors = {};

        if (!title || title.trim().length < 10) {
            isValid = false;
            errors.title = notifications.titleRequired;
        }

        if (!content || content.trim().length < 20) {
            isValid = false;
            errors.content = notifications.contentRequired;
        }

        const urlToImageRegex = /(http[s]?:\/\/.*.(?:png|jpg|gif|svg|jpeg))/i;

        if (!urlToImageRegex.test(urlToImage)) {
            isValid = false
            errors.urlToImage = notifications.urlToImageRequired;
        }

        return isValid;
    }

    return (
        <div className="main-container">
            <section className="form-container">
                <h2 className="form-container-title post">Create Post</h2>
                <FormPost data={data} onSubmitFormHandler={addPost}/>
            </section>
        </div>
    );
}

export default AddPost;