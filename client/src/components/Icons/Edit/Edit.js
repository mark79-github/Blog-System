import styles from '../Icons.module.css';
import PropTypes from "prop-types";

const Edit = ({onEdit}) => {

    const handleClick = () => {
        onEdit();
    }

    return (
        <div>
            <button className={`${styles.icon} far fa-edit`} onClick={handleClick}/>
        </div>
    );
}

Edit.propTypes = {
    onEdit: PropTypes.func.isRequired,
}

export default Edit;