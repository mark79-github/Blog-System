import {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom'

import AuthContext from '../AuthContext';

const Logout = () => {
    const {logout} = useContext(AuthContext);

    useEffect(()=>{
        return(()=>{
            logout();
        })
    },[]);

    return (
        <Redirect to={'/'}/>
    );
}

export default Logout;