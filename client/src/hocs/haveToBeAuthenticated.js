import {useContext} from 'react';
import {useHistory} from 'react-router-dom';

import AuthContext from '../contexts';

const haveToBeAuthenticated = (WrappedComponent) => {

    return (props) => {
        const {isLoggedIn} = useContext(AuthContext);
        const history = useHistory();

        if (!isLoggedIn) {
            history.push('/user/sign')

            return null;
        }

        return <WrappedComponent {...props} />
    };
};

export default haveToBeAuthenticated;