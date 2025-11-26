import PropTypes from 'prop-types';
import styles from './BtnReadMore.module.css'

const BtnReadMore = (props) => {

    return (
        <button className={styles.button} onClick={props.onClick}>
            Read more
        </button>
    )
}

BtnReadMore.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default BtnReadMore;
