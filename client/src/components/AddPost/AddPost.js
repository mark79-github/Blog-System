import {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import styles from './AddPost.module.css';

import * as postService from '../../services/postService';

import AuthContext from '../../contexts';

import FormPost from '../FormPost';

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