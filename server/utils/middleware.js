const Post = require('../models/Post');
const User = require('../models/User');
const response = require('./response');
const jwt = require('jsonwebtoken');
const {privateKey} = require('../config/config');

exports.verifyToken = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization
        if (!bearer) {
            response.forbidden(res, 'Missing bearer token')
            return
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
        if (!user){
            response.missing(res, `No user found with id: ${req.params.id}`)
            return
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
        if (!post){
            response.missing(res, `No post found with id: ${req.params.id}`)
            return
        }
        req.post = post
        next()
    } catch (error) {
        response.serverError(res, error.message)
    }
}
