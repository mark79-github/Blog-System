const api = 'http://localhost:5000/api/auth';

export const register = (displayName, email, password) => {
    return fetch(api + '/register', {
        method: 'POST',
        body: JSON.stringify({
            displayName,
            email,
            password
        })
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};