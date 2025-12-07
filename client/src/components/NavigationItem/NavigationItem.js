import React from 'react';
import {Link} from 'react-router-dom';

import styles from './NavigationItem.module.css';
import PropTypes from "prop-types";

const NavigationItem = (props) => {
    return (
        <li className={styles.item}>
            <Link className={styles.link} to={props.linkTo}>
                {props.children}
            </Link>
        </li>
    );
};

NavigationItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default NavigationItem;
