import React, {useContext} from "react";
import {AuthContext} from "../AuthContext/AuthContext";
import NavigationItem from "../NavigationItem";

const Navigation = () => {
    const authContext = useContext(AuthContext);
    console.log(authContext)
    return (
        <section className="navigation">
            <section className="logo-wrapper">
                <img src="/logo.png" alt="Logo"/>
            </section>
            <section>
                <nav>
                    <ul>

                        {authContext.isLoggedIn
                            ?
                            <>
                                <NavigationItem linkTo={'/user/logout'}>Logout</NavigationItem>
                                <NavigationItem linkTo={'/post/create'}>Add Post</NavigationItem>
                                <NavigationItem linkTo={'/'}>My Posts</NavigationItem>
                            </>
                            : <NavigationItem linkTo={'/user/sign'}>Sign</NavigationItem>
                        }
                        {/*<NavigationItem linkTo={'/user/sign'}>Sign</NavigationItem>*/}
                        {/*<NavigationItem linkTo={'/user/logout'}>Logout</NavigationItem>*/}
                    </ul>
                </nav>
            </section>
        </section>
    );
}

export default Navigation;