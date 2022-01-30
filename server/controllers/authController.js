const utils = require('../utils/utils');
const response = require('../utils/response')
const User = require('../models/User');
let cloudinary = require('../config/cloudinary');

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return response.forbidden(res, "User with that email already exists");
        }

        const {email, displayName, password, avatarImageUrl} = req.body;
        const cloudinaryImageUrl = await cloudinary.uploader.upload(avatarImageUrl)
            .then(cloudinary => {
                return cloudinary['secure_url'];
            }).catch(error => {throw Error(error.message)});

        const hash = await utils.hashPassword(password);
        const newUser = await new User({
            email: email,
            displayName: displayName,
            password: hash,
            avatarImageUrl: cloudinaryImageUrl
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
        if (!user || !await utils.verifyPassword(req.body.password, user.password)) {
            return response.forbidden(res, "Wrong credentials")
        }

        const token = await utils.generateAccessToken(user._id)
        res.status(200).json({token, user});
    } catch (error) {
        response.serverError(res, error.message);
    }
}
