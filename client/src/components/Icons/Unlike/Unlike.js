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

export default Unlike;
