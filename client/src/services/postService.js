const api = 'http://localhost:5000/api/posts';

export const getAll = () => {
    return fetch(api)
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const getById = (id) => {
    return fetch(api + '/' + id)
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const likeById = (id) => {
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTZmZWEwZTViNjZkMWZmNGFkMTY3MSIsImlhdCI6MTYxNjMzMzIwMn0.9p001z73eWCsEr7sXQKrUcFqVi6HZbtIWKkN-ZI5Pqs'

    return fetch(api + '/like/' + id, {
        method: "PUT",
        headers: {
            authorization: 'Bearer ' + tempToken
        }
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const unlikeById = (id) => {
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTZmZWEwZTViNjZkMWZmNGFkMTY3MSIsImlhdCI6MTYxNjMzMzIwMn0.9p001z73eWCsEr7sXQKrUcFqVi6HZbtIWKkN-ZI5Pqs'

    return fetch(api + '/unlike/' + id, {
        method: "PUT",
        headers: {
            authorization: 'Bearer ' + tempToken
        }
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const commentById = (id, comment) => {
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTZmZWEwZTViNjZkMWZmNGFkMTY3MSIsImlhdCI6MTYxNjMzMzIwMn0.9p001z73eWCsEr7sXQKrUcFqVi6HZbtIWKkN-ZI5Pqs'

    return fetch(api + '/comment/' + id, {
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + tempToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment
        })
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const addPost = (title, content, urlToImage) => {
    const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTZmZWEwZTViNjZkMWZmNGFkMTY3MSIsImlhdCI6MTYxNjMzMzIwMn0.9p001z73eWCsEr7sXQKrUcFqVi6HZbtIWKkN-ZI5Pqs'

    return fetch(api, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tempToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "title": title,
            "content": content,
            "urlToImage": urlToImage
        })
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};