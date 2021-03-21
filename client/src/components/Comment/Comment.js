import {Component} from 'react';
import * as userService from '../../services/userService';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: ''
        }
    }

    componentDidMount() {
        userService.getById(this.props.data.user)
            .then(user=>this.setState({author: user.displayName}))
            .catch(err=>console.error("Error: ", err))
    }

    render() {
        return (
            <article className="main-article-comment-content-details">
                <p><i className="far fa-trash-alt"/><span>#{this.props.data.index}</span><span>By {this.state.author}</span></p>
                <p>{this.props.data.comment}</p>
            </article>
        );
    }
}

export default Comment;