import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiMenu, FiX} from 'react-icons/fi';

import './NavBar.css';

import AuthContext from '../../contexts';

const NavBar = () => {
    const {isLoggedIn, displayName, userId} = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (

        <header className="header">
                <nav className="navbar">
                    <Link to="/" className="nav-link">
                        All Posts
                    </Link>
                    <div onClick={handleClick} className="nav-icon">
                        {open ? <FiX/> : <FiMenu/>}
                    </div>
                    <ul className={open ? 'nav-links active' : 'nav-links'}>
                        {isLoggedIn
                            ?
                            <>
                                <li className="nav-item">
                                    <Link to="/post/create" className="nav-link" onClick={closeMenu}>
                                        Add Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/?author=${userId}`} className="nav-link" onClick={closeMenu}>
                                        Own Posts
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/user/logout" className="nav-link" onClick={closeMenu}>
                                        Logout, {displayName}
                                    </Link>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <Link to="/user/sign" className="nav-link" onClick={closeMenu}>
                                    Sign
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
        </header>
    );
};

export default NavBar;
