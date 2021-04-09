import styles from '../Icons.module.css';

const Comments = (props) => {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <div>
            <i className={`${styles.icon} far fa-comments`} onClick={handleClick}/>
        </div>
    )

}

export default Comments;