import {api} from '../utils/globals';
import {request} from '../utils/data';

export const getById = (id) => {

    const apiWithUserId = `${api.users.base}/${id}`;
    return request(apiWithUserId);
};
