import logo from "../../logo.svg";
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Error 404</h1>
                <p>Page Not Found</p>
                <img src={logo} className="app-logo" alt="logo"/>
                <a className="app-link" href="/" target="_self" rel="noopener noreferrer">Return to Home</a>
            </header>
        </div>
    );
}

export default NotFound;