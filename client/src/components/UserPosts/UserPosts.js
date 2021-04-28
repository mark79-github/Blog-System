import {useEffect, useRef, useState} from 'react';

import styles from './UserPosts.module.css';

import * as postService from '../../services/postService';
import Loader from "react-loader-spinner";
import Post from "../Post";


const UserPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(false);

    useEffect(() => {

        const getAllPosts = () => {
            postService.getAll()
                .then(res => {
                    if (isMounted) {
                        setPosts(res);
                        setLoading(false);
                    }
                });
        }

        isMounted.current = true;
        getAllPosts();

        return () => {
            isMounted.current = false;
        }
    }, []);


    if (loading) {
        return (
            // <main className={styles.container}>
            <Loader type="Rings" color="white" height={80} width={80}/>
            // </main>
        )
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Posts</h2>
            {
                !!posts.length
                    ?
                    <section className={styles.wrapper}>
                        {posts.map(x => {
                            return (
                                <Post {...props} key={x._id} data={x}/>
                            )
                        })}
                    </section>
                    :
                    <h2>No Posts found</h2>
            }
        </section>
    )
}

export default UserPosts;