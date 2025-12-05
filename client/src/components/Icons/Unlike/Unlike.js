import PropTypes from 'prop-types';
import styles from '../Icons.module.css';

const Unlike = (props) => {

    const handleClick = () => {
        props.onUnlike();
    }

    return (
        <div>
            <i className={`${styles.icon} far fa-thumbs-down`} onClick={handleClick}/>
        </div>
    );
}

Unlike.propTypes = {
    onUnlike: PropTypes.func.isRequired
}

export default Unlike;
