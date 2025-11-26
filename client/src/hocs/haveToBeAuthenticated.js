import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../contexts';

const haveToBeAuthenticated = (WrappedComponent) => {
    return (props) => {
        const { isLoggedIn } = useContext(AuthContext);

        if (!isLoggedIn) {
            return <Navigate to="/user/sign" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default haveToBeAuthenticated;
