import PropTypes from 'prop-types';
import styles from './Avatar.module.css';

const Avatar = (props) => {

    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src={props.img} alt=""/>
        </div>
    )
}

Avatar.propTypes = {
    img: PropTypes.string.isRequired
};

export default Avatar;