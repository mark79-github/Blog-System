import mongoose from 'mongoose';
import * as response from '../utils/response.js';
import Post from '../models/Post.js';

export const addPost = async (req, res) => {
    try {
        const post = new Post(req.body)
        post.author = req._id
        const result = await post.save()
        res.status(200).json({post: result})
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const {author, title} = req.query;
        const options = {};

        if (author) {
            options.author = mongoose.Types.ObjectId.createFromHexString(author);
        }
        if (title) {
            options.title = {$regex: title, $options: "i"};
        }

        const posts = await Post.aggregate()
            .match(options)
            .addFields({commentsLength: {$size: "$comments"}})
            .addFields({likesLength: {$size: "$likes"}})
            .sort({publishedAt: -1});

        res.status(200).json(posts)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const getPostById = async (req, res) => {
    try {
        res.status(200).json(req.post)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = req.post

        post.title = req.body.title || post.title
        post.content = req.body.content || post.content
        post.urlToImage = req.body.urlToImage || post.urlToImage

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const likePost = async (req, res) => {
    try {
        const post = req.post

        const set = new Set(post.likes)
        set.add(req._id)

        post.likes = [...set]

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const unlikePost = async (req, res) => {
    try {
        const post = req.post

        post.likes = post.likes.filter(id => id !== req._id)

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const post = req.post
        const comment = {user: req._id, comment: req.body.comment};
        post.comments.unshift(comment)
        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const deleteCommentOnPost = async (req, res) => {
    try {
        const post = req.post
        const {commentId} = req.params;

        post.comments = post.comments.filter(x => x._id.toString() !== commentId)

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const visitPost = async (req, res) => {
    try {
        const post = req.post
        post.visits = Number(post.visits) + 1;
        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}
