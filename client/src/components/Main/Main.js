import {Component} from "react";
import * as postService from '../../services/postService';
import Article from "../Article";
import TopArticle from "../TopArticle";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        postService.getAll()
            .then(posts => {
                this.setState({posts})
            });
    }

    render() {
        return (
            <div className="main-container">
                <TopArticle/>
                <section className="sub-article">
                    {this.state.posts.map(x => {
                        return (<Article
                            key={x._id} urlToImage={x.urlToImage}/>)
                    })}
                </section>
            </div>
        )
    }
}

export default Main;