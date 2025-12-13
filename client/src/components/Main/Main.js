import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import styles from './Main.module.css';

import * as postService from '../../services/postService';

import Post from '../Post';
import TopPost from '../TopPost';
import FormSearch from '../FormSearch';
import FormOrder from '../FormOrder';

const Main = (props) => {
    const [topPost, setTopPost] = useState([]);
    const [posts, setPosts] = useState([]);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();

    const orderBy = searchParams.get("orderBy") || "publishedAt";
    const title = searchParams.get("title") || "";

    const onSearch = (title) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            if (title) newParams.set("title", title);
            else newParams.delete("title");
            return newParams;
        });
    };

    const onOrderChange = (value) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("orderBy", value);
            return newParams;
        });
    };

    useEffect(() => {
        let abort = false;

        async function load() {
            setIsFetching(true);

            const query = `?${searchParams.toString()}`;
            const data = await postService.getAll(query);

            if (abort) return;

            const sorted = [...data].sort((a, b) => {
                if (Array.isArray(a[orderBy])) {
                    return b[orderBy].length - a[orderBy].length;
                }
                return b[orderBy] - a[orderBy];
            });

            setTopPost(sorted.slice(0, 1));
            setPosts(sorted.slice(1));

            setIsFetching(false);
            setIsInitialLoad(false);
        }

        load();

        return () => {
            abort = true;
        }
    }, [searchParams, orderBy]);

    if (isInitialLoad && isFetching) {
        return (
            <main className={styles.container}>
                <Loader type="Rings" color="white" height={80} width={80}/>
            </main>
        );
    }

    if (!topPost.length && !isFetching) {
        return (
            <main className={styles.container}>
                <FormSearch onSearch={onSearch} searchValue={title}/>
                <FormOrder onOrderChange={onOrderChange} orderBy={orderBy} disabled/>
                <section className={styles["empty-container"]}>
                    <h1 className={styles.title}>No posts found</h1>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <FormSearch onSearch={onSearch} searchValue={title}/>
            <FormOrder onOrderChange={onOrderChange} orderBy={orderBy} disabled={isFetching}/>

            {isFetching && (
                <div style={{opacity: 0.8, margin: "12px 0"}}>
                    <Loader type="Rings" color="white" height={28} width={28}/>
                </div>
            )}

            {topPost.map((x) => (
                <TopPost key={x._id} data={x} {...props} />
            ))}

            {!!posts.length && (
                <section className={styles.wrapper}>
                    {posts.map((x) => (
                        <Post {...props} key={x._id} data={x}/>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Main;
