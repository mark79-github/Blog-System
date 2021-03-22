const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {privateKey, saltRounds} = require('../config/config');

exports.generateAccessToken = async (id) => jwt.sign({id}, privateKey)

exports.verifyPassword = async (password, hash) => bcrypt.compare(password, hash)

exports.hashPassword = async (password) => {
    const rounds = Math.floor(Math.random() * 10) + 1
    return bcrypt.hash(password, saltRounds)
}
