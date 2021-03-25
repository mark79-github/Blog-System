import {Component} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topPost: [],
            posts: [],
            loading: true,
            searchQry: props.searchQry,
        }
    }

    componentDidMount() {
        postService.getAll(this.state.searchQry)
            .then(posts => {
                this.setState({topPost: posts.slice(0, 1)})
                this.setState({posts: posts.slice(1)});
                this.setState({loading: false})
            });
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="main-container">
                    <h2 style={{color: 'white'}}>Loading...</h2>
                </div>
            )
        }
        return (
            <div className="main-container">
                {this.state.topPost.map(x => {
                    return (<TopArticle key={x._id} data={x}/>)
                })}
                <section className="sub-article">
                    {this.state.posts.map(x => {
                        return (<Article key={x._id} data={x}/>)
                    })}
                </section>
            </div>
        )
    }
}

export default Main;