import {Component} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topPost: [],
            posts: []
        }
    }

    componentDidMount() {
        postService.getAll()
            .then(posts => {
                this.setState({topPost: posts.slice(0, 1)})
                this.setState({posts: posts.slice(1)});
            });
    }

    render() {
        if (!this.state.topPost.length) {
            return (
                <h2 style={{color:'white'}}>Loading...</h2>
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