import styles from '../Icons.module.css';
import PropTypes from "prop-types";

const Like = (props) => {

    const handleClick = () => {
        props.onLike();
    }

    return (
        <div>
            <button className={`${styles.icon} far fa-thumbs-up`} onClick={handleClick}/>
        </div>
    )
}

Like.propTypes = {
    onLike: PropTypes.func.isRequired,
}

export default Like;