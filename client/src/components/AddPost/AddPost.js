import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './AddPost.module.css';
import * as postService from '../../services/postService';
import AuthContext from '../../contexts';
import FormPost from '../FormPost';

const AddPost = () => {
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const post = {
        title: '',
        content: '',
        urlToImage: '',
    }

    const addPost = (data) => {
        const {title, content, urlToImage} = data;

        postService.addPost(title, content, urlToImage, token)
            .then(() => {
                navigate('/');
            });
    }

    return (
        <main className={styles.container}>
            <section className={styles.wrapper}>
                <h2 className={styles.title}>Create Post</h2>
                <FormPost data={post} onSubmitFormHandler={addPost}/>
            </section>
        </main>
    );
}

export default AddPost;
