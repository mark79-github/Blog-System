import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';

const {privateKey, saltRounds} = config;

export const generateAccessToken = async (id) => jwt.sign({id}, privateKey)

export const verifyPassword = async (password, hash) => bcrypt.compare(password, hash)

export const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds)
}
