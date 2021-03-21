const api = 'http://localhost:5000/api/users';

export const getById = (id) => {
    return fetch(api + '/' + id)
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};