const mongoose = require('mongoose');
const response = require('../utils/response');
const Post = require('../models/Post');

exports.addPost = async (req, res) => {
    try {
        const post = new Post(req.body)
        post.author = req._id
        const result = await post.save()
        res.status(200).json({post: result})
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.getAllPosts = async (req, res) => {
    try {

        const {author, title} = req.query;
        let options = {};

        if (author) {
            options.author = mongoose.Types.ObjectId.createFromHexString(author);
        }
        if (title) {
            options.title = {$regex: title, $options: "i"};
        }

        // const posts = await Post.find(options)
        const posts = await Post
            .aggregate()
            .match(options)
            .addFields({commentsLength: {"$size": "$comments"}})
            .addFields({likesLength: {"$size": "$likes"}})
            .sort({publishedAt: -1})

        res.status(200).json(posts)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.getPostById = async (req, res) => {
    try {
        res.status(200).json(req.post)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.updatePost = async (req, res) => {
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

exports.deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.likePost = async (req, res) => {
    try {
        const post = req.post

        // convert the likes array to set to prevent duplication of records
        const set = new Set(post.likes)
        set.add(req._id)

        // convert the set back to an array
        post.likes = [...set]

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const post = req.post

        // remove the user id from the likes array
        post.likes = post.likes.filter(id => id !== req._id)

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.commentOnPost = async (req, res) => {
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

exports.deleteCommentOnPost = async (req, res) => {
    try {
        const post = req.post
        const {commentId} = req.params;

        // remove the commentId from the comments array
        post.comments = post.comments.filter(x => x._id.toString() !== commentId)

        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}


exports.visitPost = async (req, res) => {
    try {
        let post = req.post
        post.visits = Number(post.visits) + 1;
        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

