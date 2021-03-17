import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from './pages/error-page';
import HomePage from "./pages/home-page";

function App() {
    return (
            <Switch>
                <Route path={'/'} component={HomePage} exact/>
                <Route component={NotFound}/>
            </Switch>
    );
}

export default App;
