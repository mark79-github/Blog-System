import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import styles from './TopPost.module.css';

import BtnReadMore from '../BtnReadMore';
import {api} from '../../utils/globals';
import {request} from '../../utils/data';
import * as userService from '../../services/userService';
import {Link, useNavigate} from 'react-router-dom';

const TopPost = ({data}) => {
    let {_id, title, content, author, urlToImage, publishedAt, likes, comments, visits} = data;
    publishedAt = moment(publishedAt).format('DD.MM.YYYY hh:mm');

    const [authorName, setAuthorName] = useState('')
    let navigate = useNavigate();

    const handleButtonClick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                navigate(`/post/${_id}`);
            }).catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        userService.getById(author)
            .then((res) => {
                setAuthorName(res.displayName);
            });
    }, [author]);

    return (
        <section className={styles.article}>
            <article className={styles.wrapper}>
                <img className={styles.img} src={urlToImage} alt=""/>
            </article>
            <article className={styles.details}>
                <div>
                    <span>Published at:</span>
                    {publishedAt}
                </div>
                <div>
                    <span>Post author:</span>
                    <Link to={`/user/${author}`} className={styles.link}>
                        {authorName}
                    </Link>
                </div>
                <div>
                    <span>Comments:</span>
                    {comments.length}
                </div>
                <div>
                    <span>Likes:</span>
                    {likes.length}
                </div>
                <div>
                    <span>Views:</span>
                    {visits}
                </div>
            </article>
            <article>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.content}>{content}</p>
                <BtnReadMore onClick={handleButtonClick}/>
            </article>
        </section>
    );
}

TopPost.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        urlToImage: PropTypes.string.isRequired,
        publishedAt: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date)
        ]).isRequired,
        likes: PropTypes.arrayOf(PropTypes.string).isRequired,
        comments: PropTypes.arrayOf(PropTypes.object).isRequired,
        visits: PropTypes.number.isRequired
    }).isRequired
}

export default TopPost;