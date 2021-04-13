import React, {useState, useEffect, useCallback} from 'react'
import AuthContext from "./contexts";
import {globalConstants, notificationMsg} from "./utils/globals";
import notificationService from "./services/notificationService";

let logoutTimer;

const Auth = (props) => {

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

        async function fetchData() {

            const storedData = JSON.parse(localStorage.getItem(globalConstants.AUTH_TOKEN));
            if (storedData &&
                storedData.token &&
                storedData.userId &&
                storedData.displayName &&
                new Date(storedData.expirationTime) > new Date()) {
                await login(storedData.token, storedData.userId, storedData.displayName, new Date(storedData.expirationTime));
                console.log('login');
            }
        }

        fetchData();

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
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            displayName: displayName,
            login: login,
            logout: logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default Auth;
