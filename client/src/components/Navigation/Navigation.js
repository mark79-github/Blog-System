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
                        <NavigationItem>Add Article</NavigationItem>
                        <NavigationItem>My Articles</NavigationItem>
                        <NavigationItem>Sign</NavigationItem>
                    </ul>
                </nav>
            </section>
        </section>
    );
}

export default Navigation;