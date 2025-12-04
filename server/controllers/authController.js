import * as utils from '../utils/utils.js';
import * as response from '../utils/response.js';
import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import formidable from 'formidable';

export const register = async (req, res) => {
    try {
        const parseForm = (req) => {
            const form = formidable({multiple: true});
            return new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({fields, files});
                })
            })
        }

        const {fields, files} = await parseForm(req);
        const {displayName, email, password} = fields;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return response.forbidden(res, "User with that email already exists");
        }

        const cloudinaryImageUrl = await cloudinary.uploader.upload(files.file.filepath, {
            width: 256,
            crop: "scale"
        }).then(result => result.secure_url);

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
        response.serverError(res, error.message);
    }
}

export const login = async (req, res) => {
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
