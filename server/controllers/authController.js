const utils = require('../utils/utils');
const response = require('../utils/response')
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return response.forbidden(res, "User with that email already exists");
        }

        const hash = await utils.hashPassword(req.body.password);
        const newUser = await new User({
            email: req.body.email,
            displayName: req.body.displayName,
            password: hash
        }).save();
        const token = await utils.generateAccessToken(newUser._id);
        res.status(200).json({token, newUser});
    } catch (error) {
        response.serverError(res, error.message)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return response.missing(res, `No user found with email: ${req.body.email}`);
        }

        const matches = await utils.verifyPassword(req.body.password, user.password)
        if (!matches) {
            return response.forbidden(res, "Passwords do not match");
        }

        const token = await utils.generateAccessToken(user._id)
        res.status(200).json({token, user});
    } catch (error) {
        response.serverError(res, error.message);
    }
}
