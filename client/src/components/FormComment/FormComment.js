import {useState} from 'react';
import * as postService from '../../services/postService';
import {useHistory} from "react-router-dom";
import notificationService from "../../services/notificationService";

// class FormComment extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             value: ''
//         }
//     }
//
//     handleChange = (event) => {
//         // console.log(event.target.value)
//         this.setState({value: event.target.value});
//     }
//
//     handleSubmit = (event) => {
//         postService.commentById(this.props.commentId, this.state.value)
//             .then((comment) => {
//                 return this.setState({value: ''})
//             })
//             .catch(err => console.error('Error:', err));
//         event.preventDefault();
//     }
//
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label htmlFor="comment">Comment: </label>
//                 <textarea name="comment" id="comment" placeholder="Leave your comment..."
//                           value={this.state.value} onChange={this.handleChange}/>
//                 <input type="submit" value="Post comment"/>
//             </form>
//         )
//     }
// }

const FormComment = ({postId, token}) => {
    const [comment, setComment] = useState('');
    let history = useHistory();

    const handleInputChange = (event) => {
        setComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        postService.commentById(postId, comment, token)
            .then(() => {
                setComment('');
                history.push(`/post/${postId}`);
            })
            .catch(err => notificationService.errorMsg(err.message));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Comment:</label>
            <textarea name="comment" id="comment" placeholder="Leave your comment..."
                      value={comment} onChange={handleInputChange}/>
            <input type="submit" value="Post comment"/>
        </form>
    );
}

export default FormComment;