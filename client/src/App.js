import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/home-page";
import SignPage from "./pages/sign-page";
import DetailsPage from "./pages/details-page";
import ErrorPage from "./pages/error-page";
import CreatePostPage from "./pages/create-post-page";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
    return (
        <>
            <Header/>
            <Switch>
                <Route path={'/'} component={HomePage} exact/>
                <Route path={'/user/sign'} component={SignPage} exact/>
                <Route path={'/post/create'} component={CreatePostPage} exact/>
                <Route path={'/post/:id'} component={DetailsPage}/>
                <Route component={ErrorPage}/>
            </Switch>
            <Footer/>
        </>
    );
}

export default App;
