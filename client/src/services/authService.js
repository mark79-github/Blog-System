import {api} from '../utils/globals'
import {request, requestForm} from '../utils/data';

export const register = (data) => {

    return requestForm(api.auth.registerURL, 'POST', data);
};

export const login = (email, password) => {

    const data = {email, password}
    return request(api.auth.loginURL, 'POST', data);
};
