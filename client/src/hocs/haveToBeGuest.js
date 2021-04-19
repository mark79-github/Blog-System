import {useContext} from 'react';
import {Redirect} from 'react-router-dom';

import AuthContext from '../contexts';

const haveToBeGuest = (WrappedComponent) => {

    return (props) => {
        const {isLoggedIn} = useContext(AuthContext);

        if (isLoggedIn) {
            return <Redirect to={'/'}/>;
        }

        return <WrappedComponent {...props} />
    };
};

export default haveToBeGuest;