import React from "react";
import NavigationItem from "../NavigationItem";

const Navigation = () => {
    return (
        <section className="navigation">
            <section className="logo-wrapper">
                <img src="/logo.png" alt="Logo"/>
            </section>
            <section>
                <nav>
                    <ul>
                        <NavigationItem linkTo={'/post/create'}>Add Post</NavigationItem>
                        <NavigationItem linkTo={'/'}>My Posts</NavigationItem>
                        <NavigationItem linkTo={'/user/sign'}>Sign</NavigationItem>
                    </ul>
                </nav>
            </section>
        </section>
    );
}

export default Navigation;