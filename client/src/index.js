import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import Auth from './Auth';
import CustomErrorBoundary from './components/CustomErrorBoundary/CustomErrorBoundary';

ReactDOM.render(
    <React.StrictMode>
        <Auth>
            <Router>
                <CustomErrorBoundary>
                    <App/>
                </CustomErrorBoundary>
            </Router>
        </Auth>
    </React.StrictMode>,
    document.getElementById('root')
);
