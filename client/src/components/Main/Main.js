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
                posts.sort((f, s) => {
                    return f.likes.length - s.likes.length;
                })
                this.setState({topPost: posts.slice(0, 1)})
                this.setState({posts: posts.slice(1)});
            });
    }

    render() {
        return (
            <div className="main-container">
                <TopArticle/>
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