import {useContext, useEffect, useState} from 'react';

import styles from './Comment.module.css';

import AuthContext from '../../contexts';

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
        <article className={styles.container}>
            <span className={styles.span}>#{index}</span> <span className={styles.span}>{authorDisplayName}</span>
            <Avatar img={authorAvatarImgURL}/>
            {
                authContext.userId === user
                    ? <i className="far fa-trash-alt" onClick={handleClick}/>
                    : null
            }
            <p className={styles.p}>{comment}</p>
        </article>
    );
}

export default Comment;