import React, {useContext} from 'react';

import styles from './Navigation.module.css';

import AuthContext from '../../contexts';

import NavigationItem from '../NavigationItem';
import {Link} from "react-router-dom";

const Navigation = () => {
    const {isLoggedIn, displayName, userId} = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <section className={styles.navigation}>
                <Link className={styles.link} to={'/'}>All posts</Link>
                <nav className={styles.nav}>
                    <ul className={styles.ul}>
                        {isLoggedIn
                            ?
                            <>
                                <NavigationItem linkTo={'/post/create'}>Add Post</NavigationItem>
                                <NavigationItem linkTo={`/?author=${userId}`}>Own Posts</NavigationItem>
                                <NavigationItem linkTo={'/user/logout'}>Logout, {displayName}</NavigationItem>
                            </>
                            : <NavigationItem linkTo={'/user/sign'}>Sign</NavigationItem>
                        }
                    </ul>
                </nav>

            </section>
        </header>
    );
}

export default Navigation;