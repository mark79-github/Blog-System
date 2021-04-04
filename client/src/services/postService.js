import {api} from '../utils/globals';
import {request} from '../utils/data';

export const getAll = (query) => {
    let url = api.posts.base;

    if (query) {
        url += query;
    }

    return request(url, 'GET');
};

export const getById = (id) => {

    const apiWithPostId = `${api.posts.base}/${id}`
    return request(apiWithPostId, 'GET')
};

export const likeById = (id, token) => {

    const apiWithPostId = `${api.posts.like}/${id}`
    return request(apiWithPostId, 'PUT', {}, {}, token);
};

export const unlikeById = (id, token) => {

    const apiWithPostId = `${api.posts.unlike}/${id}`
    return request(apiWithPostId, 'PUT', {}, {}, token);
};

export const commentById = (id, comment, token) => {

    const data = {comment}
    const apiWithPostId = `${api.posts.comment}/${id}`
    return request(apiWithPostId, 'PUT', data, {}, token);
};

export const addPost = (title, content, urlToImage, token) => {

    const data = {title, content, urlToImage}
    return request(api.posts.base, 'POST', data, {}, token);
};

export const editPost = (id, title, content, urlToImage, token) => {

    const data = {title, content, urlToImage}
    const apiWithPostId = `${api.posts.base}/${id}`
    return request(apiWithPostId, 'PATCH', data, {}, token);
};

export const deleteCommentByIds = (id, commentId, token) => {

    const apiWithPostIdAndCommentId = `${api.posts.comment}/${id}/delete/${commentId}`
    return request(apiWithPostIdAndCommentId, 'DELETE', {}, {}, token);
};

export const deleteById = (id, token) => {

    const apiWithPostId = `${api.posts.base}/${id}`
    return request(apiWithPostId, 'DELETE', {}, {}, token);
};
