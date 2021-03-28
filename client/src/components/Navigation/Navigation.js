import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../AuthContext";
import NavigationItem from "../NavigationItem";

const Navigation = () => {
    const {isLoggedIn, displayName, userId} = useContext(AuthContext);

    return (
        <section className="navigation">
            <section className="logo-wrapper">
                <Link to={'/'}>
                    <img src="/logo.png" alt="Logo"/>
                </Link>
            </section>
            <section>
                <nav>
                    <ul>
                        {isLoggedIn
                            ?
                            <>
                                <NavigationItem linkTo={'/post/create'}>Add Post</NavigationItem>
                                <NavigationItem linkTo={`/?author=${userId}`}>My Posts</NavigationItem>
                                <NavigationItem linkTo={'/user/logout'}>Logout, {displayName}</NavigationItem>
                            </>
                            : <NavigationItem linkTo={'/user/sign'}>Sign</NavigationItem>
                        }
                    </ul>
                </nav>
            </section>
        </section>
    );
}

export default Navigation;