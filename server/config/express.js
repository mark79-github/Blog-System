const express = require('express');
const cookieParser = require('cookie-parser');
const {isAuthenticated} = require('../middlewares');

module.exports = (app) => {
    app.use(express.static('static'));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(isAuthenticated());
};