import {useEffect, useState} from 'react';
import moment from 'moment';

import styles from './TopPost.module.css';

import BtnReadMore from '../BtnReadMore';
import {api} from '../../utils/globals';
import {request} from '../../utils/data';
import * as userService from '../../services/userService';
import {Link} from "react-router-dom";

const TopPost = ({data, history}) => {
    let {_id, title, content, author, urlToImage, publishedAt, likes, comments, visits} = data;
    publishedAt = moment(publishedAt).format('DD.MM.YYYY hh:mm');

    const [authorName, setAuthorName] = useState('')

    const handleButtonClick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                history.push(`/post/${_id}`);
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

export default TopPost;