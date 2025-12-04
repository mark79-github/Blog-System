import * as response from '../utils/response.js';
import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        response.serverError(res, error.message)
    }
}

export const getUserById = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        response.serverError(res, error.message)
    }
}
