import {Component} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topPost: {},
            posts: []
        }
    }

    componentDidMount() {
        postService.getAll()
            .then(posts => {
                const sortedPosts = posts.sort((f, s) => {
                    return s.likes.length - f.likes.length;
                })
                this.setState({topPost: sortedPosts.slice(0, 1)[0]})
                this.setState({posts: sortedPosts.slice(1)});
            });
    }

    render() {
        return (
            <div className="main-container">
                <TopArticle data={this.state.topPost}/>
                <section className="sub-article">
                    {this.state.posts.map(x => {
                        return (<Article key={x.id} urlToImage={x.urlToImage} title={x.title} id={x.id}/>)
                    })}
                </section>
            </div>
        )
    }
}

export default Main;