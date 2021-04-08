const {username, password, db, server, privateKey} = require('./credentials.js');

const config = {
    development: {
        PORT: process.env.PORT || 5000,
        DB: `mongodb://${server}/${db}`,
        saltRounds: 10,
        privateKey,
    },
    production: {
        PORT: process.env.PORT || 5000,
        DB: `mongodb+srv://${username}:${password}@${server}/${db}?retryWrites=true&w=majority`,
        saltRounds: 7,
        privateKey,
    }
}

module.exports = config[process.env.NODE_ENV.trim()];
