import React, {useEffect, useState} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";
import Loader from "react-loader-spinner";
import notificationService from "../../services/notificationService";

const Main = ({searchQry}) => {

    const [topPost, setTopPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postService.getAll(searchQry)
            .then(posts => {
                if (!posts.length) {
                    setLoading(false);
                    return;
                }
                setTopPost(posts.slice(0, 1));
                setPosts(posts.slice(1));
                setLoading(false);
            }).catch(err => notificationService.errorMsg(err.message));
    }, [searchQry])

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