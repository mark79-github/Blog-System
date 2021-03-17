import logo from '../../logo.svg';
import './index.css';

function NotFound() {
    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt="logo"/>
                <p>Error 404 - Page Not Found</p>
                <a className="app-link" href="/" target="_self" rel="noopener noreferrer">Return to Home</a>
            </header>
        </div>
    );
}

export default NotFound;
