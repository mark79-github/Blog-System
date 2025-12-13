import styles from '../Icons.module.css';
import PropTypes from "prop-types";

const Delete = ({onDelete}) => {

    const handleClick = () => {
        onDelete();
    }

    return (
        <div>
            <button className={`${styles.icon} far fa-trash-alt`} onClick={handleClick}/>
        </div>
    );
}

Delete.propTypes = {
    onDelete: PropTypes.func.isRequired
}

export default Delete;