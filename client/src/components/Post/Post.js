import BtnReadMore from '../BtnReadMore';
import {api} from "../../utils/globals";
import {request} from "../../utils/data";

import styles from './Post.module.css';
import {useNavigate} from 'react-router-dom';

const Post = ({data}) => {
    const {_id, title, urlToImage} = data;
    let navigate = useNavigate();

    const handleButtonCLick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                navigate(`/post/${_id}`);
            }).catch(error => console.error('Error:', error));
    }

    return (
        <article className={styles.wrapper}>
            <article>
                <img className={styles.img} src={urlToImage} alt=""/>
            </article>
            <article className={styles.description}>
                <h2 className={styles.title}>{title}</h2>
                <BtnReadMore onClick={handleButtonCLick}/>
            </article>
        </article>
    );
}

export default Post;