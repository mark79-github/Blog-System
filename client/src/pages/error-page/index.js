import logo from '../../logo.svg';
import '../../components/NotFound/NotFound.css';

function ErrorPage() {

    return (
        <div className="app">
            <header className="app-header">
                <img src={logo} className="app-logo" alt=""/>
                <p>Error 404 - Page Not Found</p>
                <a className="app-link" href="/" target="_self" rel="noopener noreferrer">Return to Home</a>
            </header>
        </div>
    );
}

export default ErrorPage;
