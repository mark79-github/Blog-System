import React from 'react';
import {Link} from 'react-router-dom';

import styles from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={styles.item}>
            <Link className={styles.link} to={props.linkTo}>
                {props.children}
            </Link>
        </li>
    );
};

export default NavigationItem;
