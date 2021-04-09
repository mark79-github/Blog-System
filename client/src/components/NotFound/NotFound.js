import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>Error 404</h1>
                <p>Page Not Found</p>
                <img src={logo} className={styles.logo} alt=""/>
                <Link to={'/'} className={styles.link}>Return to Home</Link>
            </header>
        </div>
    );
}

export default NotFound;