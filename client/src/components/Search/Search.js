import React from "react";

const Search = () =>{
    return (
        <section className="header-search">
            <form action="#" className="header-search-form">
                <input type="search" name="search" id="search" placeholder="Search by title ..."/>
                <input type="submit" className="header-search-form-submit" value="&#xf002;"/>
            </form>
        </section>
    );
}

export default Search;