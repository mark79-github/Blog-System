import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthContext from "./components/AuthContext";
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
        const authToken = localStorage.getItem("authToken");
        const authUser = JSON.parse(localStorage.getItem("authUser"));

        console.log('authUser', authUser);

        if (!authToken || !authUser) {
            return {
                isLoggedIn: false,
                token: null,
                displayName: '',
                login: () => {
                },
                logout: () => {
                }
            };
        }

        return {...authUser, isLoggedIn: true};
    };

    render() {
        const {user} = this.state;
        console.log('app render - user', user);
        return (
            <>
                <AuthContext.Provider value={user}>
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
