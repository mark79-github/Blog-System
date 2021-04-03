import React, {Component} from "react";
import queryString from 'query-string';
import Loader from 'react-loader-spinner';

import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";
import notificationService from "../../services/notificationService";
import FormSearch from "../FormSearch";
import FormOrder from "../FormOrder";

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

        this._isMounted = false

        this.state = {
            topPost: [],
            posts: [],
            loading: true,
        }
    }

    onSearch = (title) => {
        const result = queryString.parse(this.props.location.search);
        Object.assign(result, {title});
        this.props.history.push(`/?${queryString.stringify(result)}`)
    }

    componentWillUnmount() {
        console.log('Main.js - componentWillUnmount');
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            if (this._isMounted) {
                this.getAllPosts();
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getAllPosts();
    }

    getAllPosts = () => {
        postService.getAll(this.props.location.search)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        topPost: res.slice(0, 1),
                        posts: res.slice(1),
                        loading: false
                    })
                }
            })
            .catch(err => notificationService.errorMsg(err.message));
    }

    render() {

        if (Object.keys(this.state.topPost).length === 0) {
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
                    <FormOrder/>
                    <section className="top-article">
                        <h1 style={{color: "white", textAlign: "center"}}>No posts found on given criteria</h1>
                    </section>
                </div>
            )
        }



        return (
            <div className="main-container">

                <FormSearch onSearch={this.onSearch}/>
                <FormOrder/>

                {this.state.topPost.map(x => {
                    return (<TopArticle key={x._id} data={x} {...this.props}/>)
                })}

                {
                    !!this.state.posts.length
                        ?
                        <section className="sub-article">
                            {this.state.posts.map(x => {
                                return (
                                    <Article {...this.props} key={x._id} data={x}/>
                                )
                            })}
                        </section>
                        :
                        null
                }

            </div>
        );
    }
}

export default Main;