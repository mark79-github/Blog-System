const Post = require('../models/Post');
const User = require('../models/User');
const response = require('./response');
const jwt = require('jsonwebtoken');
const {privateKey} = require('../config/config');

exports.verifyToken = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization

        {
            const t = req.cookies.token;
            console.log('t', t);
        }

        if (!bearer) {
            return response.forbidden(res, 'Missing bearer token')
        }

        const token = bearer.split(" ")[1]
        const payload = await jwt.verify(token, privateKey)
        req._id = payload.id
        next()
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return response.missing(res, `No user found with id: ${req.params.id}`)
        }
        req.user = user
        next()
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return response.missing(res, `No post found with id: ${req.params.id}`)
        }
        req.post = post
        next()
    } catch (error) {
        response.serverError(res, error.message)
    }
}
