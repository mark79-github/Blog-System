import {api} from "../../utils/globals";
import {request} from "../../utils/data";

import styles from './PostListView.module.css';

const PostListView = ({data, history}) => {
    const {_id, title, urlToImage} = data;

    const handleButtonCLick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                history.push(`/post/${_id}`);
            }).catch(error => console.error('Error:', error));
    }

    return (
        <article className={styles.container}>
            <article className={styles.wrapper}>
                <img className={styles.img} src={urlToImage} alt=""/>
            </article>
            <article className={styles.description}>
                <h2 className={styles.title} onClick={handleButtonCLick}>{title}</h2>
                {/*<BtnReadMore onClick={handleButtonCLick}/>*/}
            </article>
        </article>
    );
}

export default PostListView;