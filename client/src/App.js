import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Error 404 - Page Not Found</p>
                <a className="App-link" href="/" target="_self" rel="noopener noreferrer"> Return to Home</a>
            </header>
        </div>
    );
}

export default App;
