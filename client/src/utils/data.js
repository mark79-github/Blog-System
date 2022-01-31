const getToken = (token) => {
    return token ? {Authorization: `Bearer ${token}`} : {};
};

const request = async (url, method, data = {}, options = {}, token) => {
    const authorization = getToken(token);
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authorization
    };

    return await fetch(url, {
        method: method || 'GET',
        headers,
        body: Object.keys(data).length ? JSON.stringify(data) : undefined,
        ...options
    }).then(res => res.json());

};

const requestForm = async (url, method, data = {}, options = {}, token) => {
    const authorization = getToken(token);
    const headers = {
        Accept: "application/json",
        ...authorization
    };

    return await fetch(url, {
        method: method || 'GET',
        headers,
        body: Object.keys(data).length ? JSON.stringify(data) : undefined,
        ...options
    }).then(res => res.json());

};

export {request, requestForm};
