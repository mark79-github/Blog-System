import {useContext, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import styles from './Comment.module.css';

import * as userService from '../../services/userService';

import AuthContext from '../../contexts';
import PropTypes from "prop-types";


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
            {/*<span className={styles.span}>{authorDisplayName.current}</span>*/}
            <Link to={`/user/${user}`} className={styles.link}>
                {authorDisplayName.current}
            </Link>
            {/*<Avatar img={authorAvatarImgURL.current}/>*/}
            {
                authContext.userId === user
                    ? <button className={`${styles.icon} far fa-trash-alt`} onClick={handleClick}/>
                    : null
            }
            <p className={styles.p}>{comment}</p>
        </article>
    );
}

Comment.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteComment: PropTypes.func.isRequired,
}

export default Comment;