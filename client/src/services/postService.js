const api = 'http://localhost:5000/api/posts';

export const getAll = (query) => {
    let url = api;

    if (query) {
        let queryArr = [];
        for (let key of Object.keys(query)) {
            queryArr.push(`${key}=${query[key]}`);
        }
        if (queryArr.length){
            url += `?${queryArr.join('&')}`;
        }
    }

    console.log('url', url);

    return fetch(url)
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const getById = (id) => {
    return fetch(api + '/' + id)
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const likeById = (id, token) => {
    return fetch(api + '/like/' + id, {
        method: "PUT",
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const unlikeById = (id, token) => {
    return fetch(api + '/unlike/' + id, {
        method: "PUT",
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const commentById = (id, comment, token) => {
    return fetch(api + '/comment/' + id, {
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment
        })
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const addPost = (title, content, urlToImage, token) => {
    return fetch(api, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, urlToImage})
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const deleteCommentByIds = (id, commentId, token) => {
    return fetch(api + '/comment/' + id + '/delete/' + commentId, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};