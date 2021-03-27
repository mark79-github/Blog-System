const api = 'http://localhost:5000/api/auth';

export const register = (displayName, email, password) => {
    return fetch(api + '/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({displayName, email, password})
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const login = async (email, password) => {
    return fetch(api + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
        .then(res => res.json())
        .catch(err => console.error(err));
};