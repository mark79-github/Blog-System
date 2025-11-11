const mongoose = require('mongoose');
const config = require('./config');
const {msg} = require('./constants');

mongoose.connect(config.DB)
    .then((res) => console.log(msg.DB_CONNECTED(res.connections[0].host, res.connections[0].name, config.PORT)))
    .catch(console.warn.bind(console, msg.DB_CONNECTION_ERROR));

module.exports = mongoose.connection;