import React, {useContext} from 'react';

import styles from './Navigation.module.css';

import AuthContext from '../../contexts';

import NavigationItem from '../NavigationItem';

const Navigation = () => {
    const {isLoggedIn, displayName, userId} = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className="header-container">
                <section className={styles.navigation}>
                    <section className="logo-wrapper">
                        <nav>
                            <ul className={styles.list}>
                                <NavigationItem linkTo={'/'}>All Posts</NavigationItem>
                            </ul>
                        </nav>
                    </section>
                    <section>
                        <nav>
                            <ul className={styles.list}>
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
                </section>
            </div>
        </header>
    );
}

export default Navigation;