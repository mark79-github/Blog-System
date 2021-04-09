import styles from '../Icons.module.css';

const Delete = ({onDelete}) => {

    const handleClick = () => {
        onDelete();
    }

    return (
        <div>
            <i className={`${styles.icon} far fa-trash-alt`} onClick={handleClick}/>
        </div>
    );
}

export default Delete;