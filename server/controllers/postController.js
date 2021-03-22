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
        const posts = await Post.find()
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
        /**
         * Checks if the fields in the body are not undefined
         * If the fields exist, update the document, otherwise, keep the existing record
         * */
        const titleUpdate = req.body.title
        console.log("titleUpdate", titleUpdate);
        post.title = titleUpdate ? titleUpdate : post.title

        const contentUpdate = req.body.content
        post.content = contentUpdate ? contentUpdate : post.content

        const urlToImageUpdate = req.body.urlToImage
        post.urlToImage = urlToImageUpdate ? urlToImageUpdate : post.urlToImage

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

        console.log('req._id', req._id);

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
        console.log(comment);
        post.comments.unshift(comment)
        const update = await post.save()
        res.status(200).json(update)
    } catch (error) {
        response.serverError(res, error.message)
    }
}