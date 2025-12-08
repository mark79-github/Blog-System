import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './NotFound.module.css';
import PropTypes from "prop-types";

const NotFound = (props) => {
    return (
        <main className={styles.app}>
            <header className={styles.header}>
                {
                    props.error
                        ? <>
                            <h2>Error occurred</h2>
                            <p>{props.error}</p>
                        </>
                        : <>
                            <h1>Error 404</h1>
                            <p>Page Not Found</p>
                        </>
                }
                <img src={logo} className={styles.logo} alt=""/>
                <Link to={'/'} className={styles.link}>Return to Home</Link>
            </header>
        </main>
    );
}

NotFound.propTypes = {
    error: PropTypes.string.isRequired,
}

export default NotFound;