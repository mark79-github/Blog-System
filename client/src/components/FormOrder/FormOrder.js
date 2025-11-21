import styles from './FormOrder.module.css';

const selectOptions = [
    {label: "Last published", value: "publishedAt"},
    {label: "Most likes", value: "likes"},
    {label: "Most comments", value: "comments"},
    {label: "Most views", value: "visits"},
];

const FormOrder = ({onOrderChange, disabled, orderBy}) => {
    return (
        <section className={styles.container}>
            <form className={styles.form}>
                <select
                    className={styles.select}
                    value={orderBy}
                    onChange={(e) => onOrderChange(e.target.value)}
                    disabled={disabled}
                >
                    {selectOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </form>
        </section>
    );
}

export default FormOrder;
