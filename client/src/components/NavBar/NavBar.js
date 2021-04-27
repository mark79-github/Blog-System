import React, {useContext, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiMenu, FiX} from 'react-icons/fi';

import styles from './NavBar.module.css';

import AuthContext from '../../contexts';
import useOutsideClick from "../../hooks/useOutsideClick";

const NavBar = () => {
    const {isLoggedIn, displayName, userId} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useOutsideClick(ref, () => {
        if (open) setOpen(false);
    });

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };

    return (

        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.link} onClick={closeMenu}>
                    All Posts
                </Link>
                <div onClick={(e) => handleClick(e)} className={styles.icon} id="nav-icon">
                    {open ? <FiX/> : <FiMenu/>}
                </div>
                <ul ref={ref} className={open ? `${styles.links} ${styles.active}` : `${styles.links}`}>
                    {isLoggedIn
                        ?
                        <>
                            <li className={styles.item}>
                                <Link to="/post/create" className={styles.link} onClick={closeMenu}>
                                    Add Post
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to={`/?author=${userId}`} className={styles.link} onClick={closeMenu}>
                                    Own Posts
                                </Link>
                            </li>
                            <li className={styles.item}>
                                <Link to="/user/logout" className={styles.link} onClick={closeMenu}>
                                    Logout, {displayName}
                                </Link>
                            </li>
                        </>
                        :
                        <li className={styles.item}>
                            <Link to="/user/sign" className={styles.link} onClick={closeMenu}>
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
