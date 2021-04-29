import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import styles from './UserPosts.module.css';

import * as postService from '../../services/postService';

import PostListView from '../PostListView';

const UserPosts = (props) => {

    const {id} = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(false);

    useEffect(() => {

        const getAllPosts = (userId) => {
            postService.getAll(`/?author=${userId}`)
                .then(res => {
                    if (isMounted) {
                        setPosts(res);
                        setLoading(false);
                    }
                });
        }

        isMounted.current = true;
        getAllPosts(id);

        return () => {
            isMounted.current = false;
        }
    }, [id]);


    if (loading) {
        return (
            <section className={styles.container}>
                <Loader type="Rings" color="white" height={80} width={80}/>
            </section>
        )
    }

    return (
        <section className={styles.container}>
            {
                !!posts.length
                    ?
                    <>
                        <h2 className={styles.title}>Posts</h2>
                        <section className={styles.wrapper}>
                            {posts.map(x => {
                                return (
                                    <PostListView {...props} key={x._id} data={x}/>
                                )
                            })}
                        </section>
                    </>
                    :
                    <h2 className={styles.title}>No posts found</h2>
            }
        </section>
    )
}

export default UserPosts;