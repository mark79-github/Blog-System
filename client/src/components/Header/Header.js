import React from 'react';
import Navigation from '../Navigation';
import Search from "../Search";

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <Navigation/>
                <Search/>
            </div>
        </header>
    );
}

export default Header;