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
                        <NavigationItem>Add Post</NavigationItem>
                        <NavigationItem>My Posts</NavigationItem>
                        <NavigationItem>Sign</NavigationItem>
                    </ul>
                </nav>
            </section>
        </section>
    );
}

export default Navigation;