import styles from './Avatar.module.css';

const Avatar = (props) => {

    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src={props.img} alt=""/>
        </div>
    )
}

export default Avatar;