import React from "react";
import FormSearch from "../FormSearch";

const Search = (props) => {

    return (
        <section className="header-search">
            <FormSearch onSearch={props.onSearch}/>
        </section>
    );
}

export default Search;