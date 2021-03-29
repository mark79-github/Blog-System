import React, {useEffect, useState} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";
import Loader from "react-loader-spinner";
import notificationService from "../../services/notificationService";
import Search from "../Search";

const Main = ({searchQry}) => {

    const [topPost, setTopPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({});

    const onSearch = (filter) => {
        setFilter(filter);
    }

    useEffect(() => {

        console.log('filter in useEffect', filter)

        postService.getAll(filter)
            .then(res => {

                console.log('posts', res);

                if (!res.length) {
                    setLoading(false);
                    return;
                }
                setTopPost(res.slice(0, 1));
                setPosts(res.slice(1));
                setLoading(false);
            }).catch(err => notificationService.errorMsg(err.message));
    }, [filter, topPost]);

    if (loading) {
        return (
            <div className="main-container">
                <Loader type="Rings" color="white" height={80} width={80}/>
            </div>
        )
    }

    if (!topPost.length) {
        return (
            <div className="main-container">
                <h1 style={{color: "white", textAlign: "center"}}>No posts found on given criteria</h1>
            </div>
        )
    }

    return (
        <div className="main-container">
            <Search onSearch={onSearch}/>
            {topPost.map(x => {
                return (<TopArticle key={x._id} data={x}/>)
            })}
            <section className="sub-article">
                {posts.map(x => {
                    return (<Article key={x._id} data={x}/>)
                })}
            </section>
        </div>
    );
}

export default Main;