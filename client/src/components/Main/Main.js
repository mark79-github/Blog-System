import React, {Component, useEffect, useState} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";
import Loader from "react-loader-spinner";
import notificationService from "../../services/notificationService";
import FormSearch from "../FormSearch";
import {login} from "../../services/authService";

// const Main = ({searchQry}) => {
//     console.log('main beginning', searchQry);
//
//     const [topPost, setTopPost] = useState([]);
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [filter, setFilter] = useState(searchQry);
//
//     const onSearch = (searchObj) => {
//         // console.log('OnSearch', filter);
//         // console.log('OnSearch', searchObj);
//         setFilter(searchObj);
//         // console.log('after setFilter', filter);
//     }
//
//     useEffect(() => {
//         console.log('useEffect filter', filter);
//     }, [filter])
//
//     useEffect(() => {
//
//         console.log('filter in useEffect', filter)
//
//         postService.getAll(filter)
//             .then(res => {
//
//                 console.log('posts', res);
//
//                 if (!res.length) {
//                     setLoading(false);
//                     return;
//                 }
//                 setTopPost(res.slice(0, 1));
//                 setPosts(res.slice(1));
//                 setLoading(false);
//             }).catch(err => notificationService.errorMsg(err.message));
//     }, []);
//
//     if (loading) {
//         return (
//             <div className="main-container">
//                 <Loader type="Rings" color="white" height={80} width={80}/>
//             </div>
//         )
//     }
//
//     if (!topPost.length) {
//         return (
//             <div className="main-container">
//                 <h1 style={{color: "white", textAlign: "center"}}>No posts found on given criteria</h1>
//             </div>
//         )
//     }
//
//     return (
//         <div className="main-container">
//
//             <FormSearch onSearch={onSearch}/>
//
//             {topPost.map(x => {
//                 return (<TopArticle key={x._id} data={x}/>)
//             })}
//
//             <section className="sub-article">
//                 {posts.map(x => {
//                     return (<Article key={x._id} data={x}/>)
//                 })}
//             </section>
//
//         </div>
//     );
// }

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topPost: [],
            posts: [],
            loading: true,
            filter: {}
        }
    }

    shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }

        return true;
    }

    onSearch = (searchObj) => {
        console.log(searchObj.title);
        this.setState({filter: searchObj})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        // !this.shallowEqual(prevProps.searchQry, this.props.searchQry) ||
        if (
            !this.shallowEqual(prevState.filter, this.state.filter)) {
            console.log('differs - this.props.searchQry', this.props.searchQry)
            console.log('differs - this.state.filter', this.props.searchQry)
            postService.getAll(this.state.filter)
                .then(res => {

                    console.log('posts', res);

                    // if (!res.length) {
                    //     this.setState({loading: false})
                    //     return;
                    // }

                    this.setState({
                        topPost: res.slice(0, 1)
                    })
                    this.setState({
                        posts: res.slice(1)
                    })

                    this.setState({
                        loading: false
                    })

                })
                .catch(err => notificationService.errorMsg(err.message));
        }
    }

    componentDidMount() {
        console.log('this.props.searchQry', this.props.searchQry);
        console.log('this.state.filter', this.state.filter);
        postService.getAll(this.state.filter)
            .then(res => {

                // console.log('posts', res);

                // if (!res.length) {
                //     this.setState({loading: false})
                //     return;
                // }

                this.setState({
                    topPost: res.slice(0, 1)
                })
                this.setState({
                    posts: res.slice(1)
                })

                this.setState({
                    loading: false
                })

            })
            .catch(err => notificationService.errorMsg(err.message));
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="main-container">
                    <Loader type="Rings" color="white" height={80} width={80}/>
                </div>
            )
        }

        if (!this.state.topPost.length) {
            return (
                <div className="main-container">
                    <FormSearch onSearch={this.onSearch}/>
                    <h1 style={{color: "white", textAlign: "center"}}>No posts found on given criteria</h1>
                </div>
            )
        }

        return (
            <div className="main-container">

                <FormSearch onSearch={this.onSearch}/>

                {this.state.topPost.map(x => {
                    return (<TopArticle key={x._id} data={x}/>)
                })}

                <section className="sub-article">
                    {this.state.posts.map(x => {
                        return (<Article key={x._id} data={x}/>)
                    })}
                </section>

            </div>
        );
    }
}

export default Main;