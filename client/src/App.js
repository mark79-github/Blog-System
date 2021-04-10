import React, {useCallback, useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import notificationService from './services/notificationService';

import AuthContext from './contexts';

import HomePage from './pages/home-page';
import SignPage from './pages/sign-page';
import DetailsPage from './pages/details-page';
import ErrorPage from './pages/error-page';
import CreatePostPage from './pages/create-post-page';
import EditPostPage from './pages/edit-post-page';
import Notification from './components/Notification';
import Header from './components/Header';
import Footer from './components/Footer';
import Logout from './components/Logout';

import {globalConstants, notificationMsg} from './utils/globals';
import isAuth from './hoc';
import CustomErrorBoundary from './components/CustomErrorBoundary/CustomErrorBoundary';

let logoutTimer;

const App = () => {

    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const login = useCallback((token, userId, displayName, expirationTime) => {
        setToken(token);
        setUserId(userId);
        setDisplayName(displayName);
        const expiration = expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(expiration);
        localStorage.setItem(globalConstants.AUTH_TOKEN, JSON.stringify({
            token,
            userId,
            displayName,
            expirationTime: expiration.toISOString()
        }));
        notificationService.successMsg(notificationMsg.loginSuccessfully);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setDisplayName(null);
        localStorage.removeItem(globalConstants.AUTH_TOKEN);
        notificationService.infoMsg(notificationMsg.logoutSuccessfully);
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(globalConstants.AUTH_TOKEN));
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
                <CustomErrorBoundary>
                    <Switch>

                        <Route path={'/'} component={(props) => <HomePage {...props}/>} exact/>

                        <Route exact path='/post/create' component={isAuth(CreatePostPage)}/>

                        <Route exact path='/post/:id/edit' render={(props) => (
                            !!token ? <EditPostPage {...props}/> : <Redirect to='/user/sign'/>
                        )}/>
                        {/*<Route exact path={'/post/:id/edit'} component={(props) => <EditPostPage {...props}/>}/>*/}
                        {/*<Route exact path={'/post/:id/edit'} component={isAuth(<EditPostPage/>)}/>*/}

                        <Route path={'/post/:id'} component={DetailsPage} exact/>

                        <Route exact path="/user/sign" render={() => (
                            !!token ? <Redirect to='/'/> : <SignPage/>
                        )}/>
                        {/*<Route path={'/user/sign'} component={SignPage} exact/>*/}

                        <Route exact path="/user/logout" render={() => (
                            !!token ? <Logout/> : <Redirect to="/"/>
                        )}/>
                        {/*<Route path={'/user/logout'} component={Logout} exact/>*/}

                        <Route exact path='/error' component={ErrorPage}/>
                        <Route component={ErrorPage}/>

                    </Switch>
                </CustomErrorBoundary>
                <Footer/>
            </AuthContext.Provider>
        </>
    );
}

export default App;
