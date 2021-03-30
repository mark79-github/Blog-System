import {useState} from 'react'

const FormSearch = (props) => {
    const [search, setSearch] = useState('')

    const handleInputChange = (event) => {
        setSearch(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onSearch({title: search});

        setSearch('');
    }

    return (
        <section className="header-search">
            <form className="header-search-form" onSubmit={handleSubmit}>
                <input type="text" name="search" id="search" placeholder="Search by title ..."
                       value={search}
                       onChange={handleInputChange}/>
                <input type="submit" className="header-search-form-submit" value="&#xf002;"/>
            </form>
        </section>
    );
}

export default FormSearch;