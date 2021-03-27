import {useEffect, useState} from 'react';
import * as userService from '../../services/userService';

// class Comment extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             author: ''
//         }
//     }
//
//     handleClick = () => {
//         this.props.onDeleteComment();
//     }
//
//     componentDidMount() {
//         userService.getById(this.props.data.user)
//             .then(user => this.setState({author: user.displayName}))
//             .catch(err => console.error("Error: ", err))
//     }
//
//     render() {
//         return (
//             <article className="main-article-comment-content-details">
//                 <p><i className="far fa-trash-alt"
//                       onClick={this.handleClick}/><span>#{this.props.data.index}</span><span>By {this.state.author}</span>
//                 </p>
//                 <p>{this.props.data.comment}</p>
//             </article>
//         );
//     }
// }

const Comment = ({data, onDeleteComment}) => {
    const {index, comment, user} = data;
    const [author, setAuthor] = useState('');

    const handleClick = () => onDeleteComment();

    useEffect(() => {
        userService.getById(user)
            .then(user => setAuthor(user.displayName))
            .catch(err => console.error("Error: ", err))
    }, [])

    return (
        <article className="main-article-comment-content-details">
            <p><i className="far fa-trash-alt"
                  onClick={handleClick}/><span>#{index}</span><span>By {author}</span>
            </p>
            <p>{comment}</p>
        </article>
    );
}

export default Comment;