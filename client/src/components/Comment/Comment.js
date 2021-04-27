import {useContext, useEffect, useRef, useState} from 'react';

import styles from './Comment.module.css';

import AuthContext from '../../contexts';

import * as userService from '../../services/userService';
import Avatar from "../Icons/Avatar";
import Loader from "react-loader-spinner";

const Comment = ({data, onDeleteComment}) => {
    const {_id, index, comment, user} = data;
    const authContext = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const authorDisplayName = useRef('');
    const authorAvatarImgURL = useRef('');

    const handleClick = () => onDeleteComment(_id);

    useEffect(() => {

        const getUserData = () => {
            userService.getById(user)
                .then(res => {
                    authorDisplayName.current = res.displayName;
                    authorAvatarImgURL.current = res.avatarImageUrl;
                    setLoading(false);
                });
        }

        getUserData();
    }, [user]);

    if (loading) {
        return (
            <article className={styles.container}>
                <Loader type="Rings" color="white" height={80} width={80}/>
            </article>
        )
    }

    return (
        <article className={styles.container}>
            <span className={styles.span}>#{index}</span>
            <span className={styles.span}>{authorDisplayName.current}</span>
            <Avatar img={authorAvatarImgURL.current}/>
            {
                authContext.userId === user
                    ? <i className={`${styles.icon} far fa-trash-alt`} onClick={handleClick}/>
                    : null
            }
            <p className={styles.p}>{comment}</p>
        </article>
    );
}

export default Comment;