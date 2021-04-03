import React, {useContext} from "react";
import AuthContext from "../AuthContext";
import NavigationItem from "../NavigationItem";

const Navigation = () => {
    const {isLoggedIn, displayName, userId} = useContext(AuthContext);

    return (
        <header>
            <div className="header-container">
                <section className="navigation">
                    <section className="logo-wrapper">
                        <nav>
                            <ul>
                                <NavigationItem linkTo={'/'}>Blog System</NavigationItem>
                            </ul>
                        </nav>
                    </section>
                    <section>
                        <nav>
                            <ul>
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