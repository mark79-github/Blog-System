import React from 'react';
import Navigation from '../Navigation';
import Search from "../Search";

const Header = (props) => {

    return (
        <header>
            <div className="header-container">
                <Navigation onSearch={props.onSearch}/>
                <Search onSearch={props.onSearch}/>
            </div>
        </header>
    );
}

export default Header;