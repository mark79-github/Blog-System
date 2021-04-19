import {api} from '../utils/globals'
import {request} from '../utils/data';

export const register = (displayName, email, password, avatarImageUrl) => {

    const data = {displayName, email, password, avatarImageUrl}
    return request(api.auth.registerURL, 'POST', data);
};

export const login = (email, password) => {

    const data = {email, password}
    return request(api.auth.loginURL, 'POST', data);
};