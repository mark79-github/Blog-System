const utils = require('../utils/utils');
const response = require('../utils/response')
const User = require('../models/User');
let cloudinary = require('../config/cloudinary');
let formidable = require('formidable');

exports.register = async (req, res) => {
    try {

        const parseForm = (req) => {
            const form = formidable({multiple: true});
            return new Promise(
                function (resolve, reject) {
                    form.parse(req, (err, fields, files) => {
                        if (err) reject(err);
                        else resolve({fields, files});
                    })
                })
        }

        const result = await parseForm(req)
            .then((response) => {
                return response;
            }).catch(error => {
                throw Error(error.message)
            })

        const {fields, files} = result
        const {displayName, email, password} = fields

        const user = await User.findOne({email});
        if (user) {
            return response.forbidden(res, "User with that email already exists");
        }

        const cloudinaryImageUrl = await cloudinary.uploader.upload(files.file.filepath)
            .then(cloudinary => {
                return cloudinary['secure_url'];
            }).catch(error => {
                throw Error(error.message)
            });

        const hash = await utils.hashPassword(password);
        const newUser = await new User({
            email,
            displayName,
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
