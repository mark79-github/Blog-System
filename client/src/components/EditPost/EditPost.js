import {useContext, useEffect, useRef, useState} from 'react';
import Loader from 'react-loader-spinner';

import * as postService from '../../services/postService';

import styles from './EditPost.module.css';

import AuthContext from '../../contexts';

import FormPost from '../FormPost';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const EditPost = () => {

    const {id} = useParams();
    const {token, userId} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState({});

    const isMounted = useRef(false);

    const editPost = (data) => {

        let title = data.title
        let content = data.content;
        let urlToImage = data.urlToImage;

        postService.editPost(id, title, content, urlToImage, token)
            .then(() => {
                navigate(`/post/${id}`);
            });
    }

    useEffect(() => {
        const getPostById = (postId) => {
            postService.getById(postId)
                .then(post => {
                    if (isMounted) {
                        if (post.author === userId) {
                            setPost(post);
                        } else {
                            navigate('/');
                        }
                    }
                });
        }

        isMounted.current = true;
        getPostById(id);

        return () => {
            isMounted.current = false;
        }
    }, [id, location.history, userId]);

    return (
        <main className={styles.container}>
            {
                Object.keys(post).length
                    ?
                    <section className={styles.wrapper}>
                        <h2 className={styles.title}>Edit Post</h2>
                        <FormPost data={post} onSubmitFormHandler={editPost}/>
                    </section>
                    :
                    <Loader type="Rings" color="white" height={80} width={80}/>
            }
        </main>
    );

}

export default EditPost;
