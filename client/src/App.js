import React, {useState, useEffect, useCallback} from 'react';
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

let logoutTimer;

const App = () => {

    const [token, setToken] = useState(false);
    // TODO after refresh not keeping token state
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((token, expirationTime) => {
        setToken(token);
        const expiration = expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(expiration);
        localStorage.setItem("authToken", JSON.stringify({
            token,
            expirationTime: expiration.toISOString()
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem("authToken");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("authToken"));
        if (storedData &&
            storedData.token &&
            new Date(storedData.expirationTime) > new Date()) {
            login(storedData.token, new Date(storedData.expirationTime));
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    return (
        <>
            <AuthContext.Provider value={{
                isLoggedIn: !!token,
                token: token,
                login: login,
                logout: logout
            }}>
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

export default App;
