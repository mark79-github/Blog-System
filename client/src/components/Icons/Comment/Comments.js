import styles from '../Icons.module.css';
import PropTypes from 'prop-types';

const Comments = (props) => {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <div>
            <button className={`${styles.icon} far fa-comments`} onClick={handleClick}/>
        </div>
    )

}

Comments.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default Comments;