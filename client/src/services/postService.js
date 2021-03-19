// const localhostApi = 'http://localhost:5000/posts';
const localhostApi = 'https://newsapi.org/v2/top-headlines?country=bg&apiKey=59cbe769d88f4f57b18104609a176fca'
export const getAll = () => {
    return fetch(localhostApi, {mode: 'cors'})
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};

export const getById = (id) => {
    return fetch(localhostApi + '/' + id, {mode: 'cors'})
        .then(res => res.json())
        .catch(err => console.error('Error:' + err));
};