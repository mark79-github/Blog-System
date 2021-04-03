import {useContext, useEffect, useState} from 'react';
import * as userService from '../../services/userService';
import notificationService from "../../services/notificationService";
import AuthContext from "../AuthContext";

const Comment = ({data, onDeleteComment}) => {
    const {_id, index, comment, user} = data;
    const authContext = useContext(AuthContext);
    const [authorDisplayName, setAuthorDisplayName] = useState('');

    // const userId = user._id;

    const handleClick = () => onDeleteComment(_id);

    useEffect(() => {
        const getUserDisplayName = () => {
            userService.getById(user)
                .then(user => setAuthorDisplayName(user.displayName))
                .catch(err => notificationService.errorMsg(err.message));
        }
        getUserDisplayName();
    }, [user]);

    return (
            <article className="main-article-comment-content-details">
                <p>
                    <span>#{index}</span><span>{authorDisplayName}</span>
                    {
                        authContext.userId === user
                            ? <i className="far fa-trash-alt" onClick={handleClick}/>
                            : null
                    }
                </p>
                <p>{comment}</p>
            </article>
    );
}

export default Comment;