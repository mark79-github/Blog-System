import {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom'

import AuthContext from '../../contexts';

const Logout = () => {
    const {logout} = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Navigate to={'/'}/>
    );
}

export default Logout;