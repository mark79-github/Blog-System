const response = require('../utils/response');
const userController = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userController.find();
        res.status(200).json(users);
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.getUserById = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        response.serverError(res, error.message)
    }
}

