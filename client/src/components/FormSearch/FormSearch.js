import {useState} from 'react'
import styles from './FormSearch.module.css';

const FormSearch = (props) => {
    const [search, setSearch] = useState('')

    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(search);

        setSearch('');
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

export default FormSearch;