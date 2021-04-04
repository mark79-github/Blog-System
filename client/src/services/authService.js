import {api} from '../utils/globals'
import {request} from '../utils/data';

export const register = (displayName, email, password) => {

    const data = {displayName, email, password}
    return request(api.auth.registerURL, 'POST', data);
};

export const login = async (email, password) => {

    const data = {email, password}
    return request(api.auth.loginURL, 'POST', data);
};