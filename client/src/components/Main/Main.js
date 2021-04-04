import React, {Component} from 'react';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';

import * as postService from '../../services/postService';
import notificationService from '../../services/notificationService';

import Article from '../Article';
import TopArticle from '../TopArticle';
import FormSearch from '../FormSearch';
import FormOrder from '../FormOrder';

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
                    <FormOrder/>
                    <section className="articles-empty-container">
                        <h1>No posts found on given criteria</h1>
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