import Post from '../models/Post.js';
import User from '../models/User.js';
import * as response from './response.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const {privateKey} = config;

export const verifyToken = async (req, res, next) => {
    try {
        const bearer = req.headers.authorization

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

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return response.missing(res, `No user found with id: ${req.params.id}`)
        }

        // remove password hash from result
        req.user = {...user.toObject(), password: undefined}
        next()
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const getPost = async (req, res, next) => {
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
