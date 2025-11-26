const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {privateKey, saltRounds} = require('../config/config');

exports.generateAccessToken = async (id) => jwt.sign({id}, privateKey)

exports.verifyPassword = async (password, hash) => bcrypt.compare(password, hash)

exports.hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds)
}
