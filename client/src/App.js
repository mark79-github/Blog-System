import React, {useCallback, useEffect, useState} from 'react';
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
import Notification from "./components/Notification";
import notificationService from "./services/notificationService";

let logoutTimer;

const App = () => {

    const [token, setToken] = useState(false);

    // TODO After refresh not keeping token state
    // TODO Found Navigation is rendered before app - why - async/await?!
    const [userId, setUserId] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((token, userId, displayName, expirationTime) => {
        setToken(token);
        setUserId(userId);
        setDisplayName(displayName);
        const expiration = expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(expiration);
        localStorage.setItem("authToken", JSON.stringify({
            token,
            userId,
            displayName,
            expirationTime: expiration.toISOString()
        }));
        notificationService.infoMsg('Successfully login');
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setDisplayName(null);
        localStorage.removeItem("authToken");
        notificationService.infoMsg('Successfully logout');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("authToken"));
        if (storedData &&
            storedData.token &&
            storedData.userId &&
            storedData.displayName &&
            new Date(storedData.expirationTime) > new Date()) {
            login(storedData.token, storedData.userId, storedData.displayName, new Date(storedData.expirationTime));
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
            <Notification/>
            <AuthContext.Provider value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                displayName: displayName,
                login: login,
                logout: logout
            }}>
                <Header/>
                <Switch>

                    {/*How to pass params to component in Route if needed*/}
                    <Route path={'/'} component={(props) => <HomePage {...props}/>} exact/>
                    {/*How to pass params to component in Route if needed*/}

                    {/*<Route path={'/'} component={HomePage} exact/>*/}
                    <Route path={'/post/create'} component={CreatePostPage} exact/>
                    <Route path={'/post/:id'} component={DetailsPage}/>

                    <Route path={'/user/sign'} component={SignPage} exact/>
                    <Route path={'/user/logout'} component={Logout} exact/>

                    <Route component={ErrorPage}/>

                </Switch>
                <Footer/>
            </AuthContext.Provider>
        </>
    );
}

export default App;
