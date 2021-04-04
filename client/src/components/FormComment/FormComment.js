import {useState} from 'react';
import notificationService from '../../services/notificationService';

const FormComment = ({onNewComment}) => {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    }

    //TODO with Formik
    const notifications = {
        commentRequired: "Comment must be at least ten characters long",
    };

    const validateInput = () => {

        let isValid = true;
        const errors = {};

        if (!comment || comment.trim().length < 10) {
            isValid = false;
            errors.comment = notifications.commentRequired;
        }

        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateInput()) {
            notificationService.errorMsg('Provided data is not valid')
            return
        }

        onNewComment(comment);
        setComment('');
    }

    return (
        <form className="form-comment" onSubmit={handleSubmit}>
            <label htmlFor="comment"/>
            <textarea name="comment" id="comment" placeholder="Leave your comment..."
                      value={comment} onChange={handleInputChange}/>
            <input type="submit" value="Post comment"/>
        </form>
    );
}

export default FormComment;