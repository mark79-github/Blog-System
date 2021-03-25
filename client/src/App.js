import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthContext, defaultUser} from "./components/AuthContext/AuthContext";
import HomePage from "./pages/home-page";
import SignPage from "./pages/sign-page";
import DetailsPage from "./pages/details-page";
import ErrorPage from "./pages/error-page";
import CreatePostPage from "./pages/create-post-page";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logout from "./components/Logout";

class App extends Component {

    constructor(props) {
        super(props);

        const user = this.loadUserFromStorage();
        this.state = {user};
    }

    loadUserFromStorage = () => {
        const authToken = window.localStorage.getItem("authToken");
        const authUser = JSON.parse(window.localStorage.getItem("authUser"));

        if (!authToken || !authUser) {
            return defaultUser;
        }

        if (!authToken) {
            return defaultUser;
        }

        return {...authUser, isLoggedIn: true};
    };

    render() {
        const {user} = this.state;
        return (
            <>
                <AuthContext.Provider value={{user}}>
                    <Header/>
                    <Switch>
                        <Route path={'/'} component={HomePage} exact/>
                        <Route path={'/user/sign'} component={SignPage} exact/>
                        <Route path={'/user/logout'} component={Logout} exact/>
                        <Route path={'/post/create'} component={CreatePostPage} exact/>
                        <Route path={'/post/:id'} component={DetailsPage}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                    <Footer/>
                </AuthContext.Provider>
            </>
        );
    }
}

export default App;
