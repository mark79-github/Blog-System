// import {createContext} from 'react';
//
// const defaultUser = {
//     isLoggedIn: false,
//     _id: '',
//     displayName: '',
// };
//
// const {Consumer: UserConsumer, Provider: UserProvider} = createContext({
//     defaultUser,
// });
//
// export {UserConsumer, UserProvider, defaultUser};

import {createContext} from "react";

// const defaultUser = {
//     isLoggedIn: false,
//     token: null,
//     displayName: '',
//     login: () => {
//     },
//     logout: () => {
//     }
// };

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
