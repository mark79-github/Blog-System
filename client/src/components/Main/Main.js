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
                // const sortedPosts = posts.sort((f, s) => {
                //     // return s.likes.length - f.likes.length;
                //     return s.publishedAt - f.publishedAt;
                // })
                // this.setState({topPost: sortedPosts.slice(0, 1)[0]})
                // this.setState({posts: sortedPosts.slice(1)});

                this.setState({topPost: posts.articles.slice(0, 1)})
                this.setState({posts: posts.articles.slice(1)});

            });
    }

    render() {
        return (
            <div className="main-container">
                {this.state.topPost.map(x => {
                    return (<TopArticle key={x.id} data={x}/>)
                })}
                <section className="sub-article">
                    {this.state.posts.map(x => {
                        return (<Article key={x.id} data={x}/>)
                    })}
                </section>
            </div>
        )
    }
}

export default Main;