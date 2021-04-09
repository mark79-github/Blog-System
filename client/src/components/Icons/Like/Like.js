import styles from '../Icons.module.css';

const Like = (props) => {

    const handleClick = () => {
        props.onLike();
    }

    return (
        <div>
            <i className={`${styles.icon} far fa-thumbs-up`} onClick={handleClick}/>
        </div>
    )
}

export default Like;