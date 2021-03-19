import {Link} from "react-router-dom";
import React from "react";

const NavigationItem = (props) => {
    return (
        <li className="listItem">
            <Link to={props.linkTo}>{props.children}</Link>
        </li>
    );
}

export default NavigationItem;