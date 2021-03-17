const localhostApi = 'http://localhost:5000/posts';

export const getAll = () => {
    return fetch(localhostApi, {mode: 'cors'})
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};