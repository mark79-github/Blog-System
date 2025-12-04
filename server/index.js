import express from 'express';
import cors from 'cors';

import './config/mongoose.js';
import {msg} from './config/constants.js';
import config from './config/config.js';

import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import blogsRoute from './routes/posts.js';

const {PORT} = config;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://blog-system.netlify.app'],
    credentials: true,
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', blogsRoute);

app.listen(PORT, () => console.log(msg.APPLICATION_RUNNING(PORT)));
