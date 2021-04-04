import {Link} from "react-router-dom";
import React from "react";

const NavigationItem = (props) => {

    const clickHandler = () => {
        props.onSearch({author: props.userId})
    }

    return (
        <li className="listItem">
            {
                !props.userId
                    ? <Link to={props.linkTo}>{props.children}</Link>
                    : <Link to={{pathname:'/', author:props.linkTo}} onClick={clickHandler}>{props.children}</Link>
            }
        </li>
    );
}

export default NavigationItem;