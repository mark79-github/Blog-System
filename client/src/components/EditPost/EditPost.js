import FormPost from "../FormPost";
import notificationService from "../../services/notificationService";
import {useContext, useEffect, useState} from "react";

import * as postService from '../../services/postService';
import AuthContext from "../AuthContext";

const EditPost = (props) => {
    const {token} = useContext(AuthContext);
    const [post, setPost] = useState({});

    const postId = props.match.params.id;

    const getPostById = async (id) => {
        await postService.getById(id)
            .then((res) => {
                setPost(res);
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            })
    }

    const editPost = (event) => {
        event.preventDefault();

        let title = event.target.title.value;
        let content = event.target.content.value;
        let urlToImage = event.target.urlToImage.value;

        if (!validateInput(title, content, urlToImage)) {
            notificationService.errorMsg('Provided data is not valid')
            return
        }

        postService.editPost(postId, title, content, urlToImage, token)
            .then(() => {
                props.history.push(`/post/${postId}`)
            })
            .catch(err => notificationService.errorMsg(err.message))
        console.log('postService');
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

    useEffect(() => {
        getPostById(postId)
    }, [postId]);

    return (
        <div className="main-container">
            <section className="form-container">
                <h2 className="form-container-title post">Edit Post</h2>
                <FormPost data={post} onSubmitFormHandler={editPost}/>
            </section>
        </div>
    );

}

export default EditPost;