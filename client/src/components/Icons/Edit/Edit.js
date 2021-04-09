import styles from '../Icons.module.css';

const Edit = ({onEdit}) => {

    const handleClick = () => {
        onEdit();
    }

    return (
        <div>
            <i className={`${styles.icon} far fa-edit`} onClick={handleClick}/>
        </div>
    );
}

export default Edit;