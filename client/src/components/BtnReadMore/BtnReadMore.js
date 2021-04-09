import styles from './BtnReadMore.module.css'

const BtnReadMore = (props) => {

    return (
        <button className={styles.button} onClick={props.onClick}>
            Read more
        </button>
    )
}

export default BtnReadMore;

