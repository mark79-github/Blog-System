import {useContext} from 'react';
import {Redirect} from 'react-router-dom'

import AuthContext from '../AuthContext';

const Logout = () => {
    const authContext = useContext(AuthContext);

    authContext.logout();

    return (
        <Redirect to={'/'}/>
    );
}

export default Logout;