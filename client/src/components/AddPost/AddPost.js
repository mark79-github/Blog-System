import {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import notificationService from '../../services/notificationService';
import * as postService from '../../services/postService';

import AuthContext from '../AuthContext';

import FormPost from '../FormPost';
import {notificationMsg} from '../../utils/globals';

const AddPost = () => {
    const {token} = useContext(AuthContext);
    const history = useHistory();

    const post = {
        title: '',
        content: '',
        urlToImage: '',
    }

    const addPost = (data) => {

        const {title, content, urlToImage} = data;

        postService.addPost(title, content, urlToImage, token)
            .then(() => {
                history.push('/');
                notificationService.successMsg(notificationMsg.addPostSuccessfully);
            })
            .catch(err => notificationService.errorMsg(err.message))
    }

    return (
        <div className="main-container">
            <section className="form-container">
                <h2 className="form-container-title post">Create Post</h2>
                <FormPost data={post} onSubmitFormHandler={addPost}/>
            </section>
        </div>
    );
}

export default AddPost;