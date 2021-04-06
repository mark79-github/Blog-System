import {useContext, useEffect, useState} from 'react';

import AuthContext from '../AuthContext';

import * as userService from '../../services/userService';
import notificationService from '../../services/notificationService';
import Avatar from "../Icons/Avatar";


const Comment = ({data, onDeleteComment}) => {
    const {_id, index, comment, user} = data;
    const authContext = useContext(AuthContext);
    const [authorDisplayName, setAuthorDisplayName] = useState('');
    const [authorAvatarImgURL, setAuthorAvatarImgUrl] = useState('');

    const handleClick = () => onDeleteComment(_id);

    useEffect(() => {
        const getUserData = () => {
            userService.getById(user)
                .then(res => {
                    setAuthorDisplayName(res.displayName);
                    setAuthorAvatarImgUrl(res.avatarImageUrl);
                })
                .catch(err => notificationService.errorMsg(err.message));
        }
        getUserData();
    }, [user]);

    return (
        <article className="main-article-comment-content-details">
            <span>#{index}</span><span>{authorDisplayName}</span>
            <Avatar img={authorAvatarImgURL}/>
            {
                authContext.userId === user
                    ? <i className="far fa-trash-alt" onClick={handleClick}/>
                    : null
            }
            <p>{comment}</p>
        </article>
    );
}

export default Comment;