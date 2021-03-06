import React, {useEffect, useRef, useState} from 'react';
import queryString from 'query-string';
import {useHistory} from 'react-router-dom';
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
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('publishedAt');

    const isMounted = useRef(false);

    const history = useHistory();

    const onSearch = (title) => {
        const result = queryString.parse(history.location.search);
        Object.assign(result, {title});
        history.push(`/?${queryString.stringify(result)}`);
    }

    const onOrderChange = (value) => {
        setOrderBy(value);
    }

    useEffect(() => {

        const getAllPosts = () => {
            postService.getAll(history.location.search)
                .then(res => {
                    if (isMounted) {

                        res.sort((f, s) => {
                            if (Array.isArray(f[orderBy])) {
                                return s[orderBy].length - f[orderBy].length
                            } else {
                                return s[orderBy] - f[orderBy]
                            }
                        });

                        setTopPost(res.slice(0, 1));
                        setPosts(res.slice(1));
                        setLoading(false);
                    }
                });
        }

        isMounted.current = true;
        getAllPosts();

        return () => {
            isMounted.current = false;
        }
    }, [orderBy, history.location.search]);

    if (loading) {
        return (
            <main className={styles.container}>
                <Loader type="Rings" color="white" height={80} width={80}/>
            </main>
        )
    }

    if (!topPost.length) {
        return (
            <main className={styles.container}>
                <FormSearch onSearch={onSearch}/>
                <FormOrder onOrderChange={onOrderChange} disabled={true}/>
                <section className={styles['empty-container']}>
                    <h1 className={styles.title}>No posts found</h1>
                </section>
            </main>
        )
    }

    return (
        <main className={styles.container}>

            <FormSearch onSearch={onSearch}/>
            <FormOrder onOrderChange={onOrderChange}/>

            {topPost.map(x => {
                return (<TopPost key={x._id} data={x} {...props}/>)
            })}

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
                    null
            }

        </main>
    );


}

// class Main extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this._isMounted = false
//
//         this.state = {
//             topPost: [],
//             posts: [],
//             loading: true,
//             orderBy: 'publishedAt'
//         }
//     }
//
//     onSearch = (title) => {
//         const result = queryString.parse(this.props.location.search);
//         Object.assign(result, {title});
//         this.props.history.push(`/?${queryString.stringify(result)}`);
//     }
//
//     onOrderChange = (value) => {
//         this.setState({
//             orderBy: value
//         });
//     }
//
//     getAllPosts = () => {
//         postService.getAll(this.props.location.search)
//             .then(res => {
//                 if (this._isMounted) {
//
//                     res.sort((f, s) => {
//                         if (Array.isArray(f[this.state.orderBy])) {
//                             return s[this.state.orderBy].length - f[this.state.orderBy].length
//                         } else {
//                             return s[this.state.orderBy] - f[this.state.orderBy]
//                         }
//                     });
//
//                     this.setState({
//                         topPost: res.slice(0, 1),
//                         posts: res.slice(1),
//                         loading: false
//                     })
//                 }
//             });
//     }
//
//     componentWillUnmount() {
//         this._isMounted = false;
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (this.props.location.search !== prevProps.location.search) {
//             if (this._isMounted) {
//                 this.getAllPosts();
//             }
//         }
//
//         if (prevState.orderBy !== this.state.orderBy) {
//             if (this._isMounted) {
//                 this.getAllPosts();
//             }
//         }
//     }
//
//     componentDidMount() {
//         this._isMounted = true;
//         this.getAllPosts();
//     }
//
//     render() {
//
//         if (this.state.loading) {
//             return (
//                 <main className={styles.container}>
//                     <Loader type="Rings" color="white" height={80} width={80}/>
//                 </main>
//             )
//         }
//
//         if (!this.state.topPost.length) {
//             return (
//                 <main className={styles.container}>
//                     <FormSearch onSearch={this.onSearch}/>
//                     <FormOrder onOrderChange={this.onOrderChange} disabled={true}/>
//                     <section className={styles['empty-container']}>
//                         <h1 className={styles.title}>No posts found</h1>
//                     </section>
//                 </main>
//             )
//         }
//
//         return (
//             <main className={styles.container}>
//
//                 <FormSearch onSearch={this.onSearch}/>
//                 <FormOrder onOrderChange={this.onOrderChange}/>
//
//                 {this.state.topPost.map(x => {
//                     return (<TopPost key={x._id} data={x} {...this.props}/>)
//                 })}
//
//                 {
//                     !!this.state.posts.length
//                         ?
//                         <section className={styles.wrapper}>
//                             {this.state.posts.map(x => {
//                                 return (
//                                     <Post {...this.props} key={x._id} data={x}/>
//                                 )
//                             })}
//                         </section>
//                         :
//                         null
//                 }
//
//             </main>
//         );
//     }
// }

export default Main;