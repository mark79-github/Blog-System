import {useContext} from 'react';
import moment from 'moment';

import AuthContext from '../AuthContext';

import BtnReadMore from '../BtnReadMore';
import {api} from "../../utils/globals";
import {request} from "../../utils/data";

const TopArticle = ({data, history}) => {
    let {_id, title, content, author, urlToImage, publishedAt, likes, comments, visits} = data;
    publishedAt = moment(publishedAt).format('DD.MM.YYYY hh:mm');
    author = useContext(AuthContext).displayName;

    const handleButtonClick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                history.push(`/post/${_id}`);
            }).catch(error => console.error('Error:', error));
    }

    return (
        <section className="top-article">
            <article className="top-article-image">
                <img src={urlToImage} alt=""/>
            </article>
            <article className="top-article-details">
                <div className="top-article-details-date">
                    <span>Published at:</span>
                    {publishedAt}
                </div>
                <div className="top-article-details-author">
                    <span>Post author:</span>
                    {author}
                </div>
                <div className="top-article-details-comments">
                    <span>Comments:</span>
                    {comments.length}
                </div>
                <div className="top-article-details-likes">
                    <span>Likes:</span>
                    {likes.length}
                </div>
                <div className="main-article-details-readers">
                    <span>Views:</span>
                    {visits}
                </div>
            </article>
            <article className="top-article-description">
                <h2 className="main-article-description-title">{title}</h2>
                <p className="main-article-description-content">{content}</p>
                <BtnReadMore onClick={handleButtonClick}/>
            </article>
        </section>
    );
}

export default TopArticle;