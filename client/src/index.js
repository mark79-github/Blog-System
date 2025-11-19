import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import Auth from './Auth';
import CustomErrorBoundary from './components/CustomErrorBoundary/CustomErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Auth>
            <Router>
                <CustomErrorBoundary>
                    <App/>
                </CustomErrorBoundary>
            </Router>
        </Auth>
    </React.StrictMode>
);
