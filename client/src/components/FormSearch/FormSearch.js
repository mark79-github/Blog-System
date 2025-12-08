import {useEffect, useState} from 'react';
import styles from './FormSearch.module.css';
import PropTypes from "prop-types";

const FormSearch = ({onSearch, searchValue}) => {
    const [search, setSearch] = useState(searchValue)

    useEffect(() => {
        setSearch(searchValue)
    }, [searchValue]);

    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(search);
    }

    return (
        <section className={styles.header}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="search" className={styles.input} placeholder="Search by title ..."
                       value={search}
                       onChange={handleInputChange}/>
                <input type="submit" className={styles.submit} value="&#xf002;"/>
            </form>
        </section>
    );
}

FormSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
};

export default FormSearch;
