import React from 'react';
import {Link} from 'react-router-dom';

import styles from './NavigationItem.module.css';

const NavigationItem = (props) => {

    const clickHandler = () => {
        props.onSearch({author: props.userId})
    }

    return (
        <li className={styles.item}>
            {
                !props.userId
                    ? <Link className={styles.link} to={props.linkTo} >{props.children}</Link>
                    : <Link className={styles.link} to={{pathname:'/', author:props.linkTo}} onClick={clickHandler}>{props.children}</Link>
            }
        </li>
    );
}

export default NavigationItem;