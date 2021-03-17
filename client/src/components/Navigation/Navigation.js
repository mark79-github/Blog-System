import React from "react";

const Navigation = () => {
    return (
        <section className="navigation">
            <section className="logo-wrapper">
                <img src="/logo.png" alt="Logo"/>
            </section>
            <section>
                <nav>
                    <ul>
                        <li><a href="./sign-page.html">Sign</a></li>
                    </ul>
                </nav>
            </section>
        </section>
    );
}

export default Navigation;