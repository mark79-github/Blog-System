import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from './pages/error-page';
import HomePage from "./pages/home-page";
import SignPage from "./pages/sign-page";
import DetailsPage from "./pages/details-page";

function App() {
    return (
            <Switch>
                <Route path={'/'} component={HomePage} exact/>
                <Route path={'/user/sign'} component={SignPage} exact/>
                <Route path={'/blog/:id'} component={DetailsPage}/>
                <Route component={NotFound}/>
            </Switch>
    );
}

export default App;
