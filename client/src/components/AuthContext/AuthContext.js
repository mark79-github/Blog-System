import {createContext} from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    displayName: '',
    login: () => {
    },
    logout: () => {
    }
});

export default AuthContext;