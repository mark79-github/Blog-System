import styles from './FormOrder.module.css';
import PropTypes from "prop-types";

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
                    {selectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </form>
        </section>
    );
}

FormOrder.propTypes = {
    onOrderChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default FormOrder;
