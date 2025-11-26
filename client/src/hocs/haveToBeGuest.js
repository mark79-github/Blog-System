import {useContext} from 'react';
import {Navigate} from 'react-router-dom';

import AuthContext from '../contexts';

const haveToBeGuest = (WrappedComponent) => {
    return (props) => {
        const {isLoggedIn} = useContext(AuthContext);

        if (isLoggedIn) {
            return <Navigate to='/' replace/>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default haveToBeGuest;
