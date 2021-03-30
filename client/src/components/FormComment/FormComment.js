import {useState} from 'react';

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

const FormComment = ({onNewComment}) => {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onNewComment(comment);
        setComment('');
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