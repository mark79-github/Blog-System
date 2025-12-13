import {api} from "../../utils/globals";
import {request} from "../../utils/data";

import styles from './PostListView.module.css';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const PostListView = ({data}) => {
    const {_id, title, urlToImage} = data;
    let navigate = useNavigate();

    const handleButtonCLick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                navigate(`/post/${_id}`);
            }).catch(error => console.error('Error:', error));
    }

    return (
        <article className={styles.container}>
            <article className={styles.wrapper}>
                <img className={styles.img} src={urlToImage} alt=""/>
            </article>
            <article className={styles.description}>
                <button className={styles.title} onClick={handleButtonCLick}>{title}</button>
            </article>
        </article>
    );
}

PostListView.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        urlToImage: PropTypes.string.isRequired,
    }).isRequired,
};

export default PostListView;