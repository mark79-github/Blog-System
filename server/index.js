const express = require('express');
require('./config/mongoose');
const cors = require('cors');

const {msg} = require('./config/constants');
const {PORT} = require('./config/config');

const corsOptions = {
    origin: [
        'https://blog-system.netlify.app',
        'http://localhost:3000'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const blogsRoute = require('./routes/posts');

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', blogsRoute);

app.listen(PORT, () => console.log(msg.APPLICATION_RUNNING(PORT)));
