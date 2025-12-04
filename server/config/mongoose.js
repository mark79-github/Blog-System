import mongoose from 'mongoose';
import config from './config.js';
import {msg} from './constants.js';

try {
    const res = await mongoose.connect(config.DB);
    console.log(msg.DB_CONNECTED(res.connections[0].host, res.connections[0].name, config.PORT));
} catch (err) {
    console.error(msg.DB_CONNECTION_ERROR, err);
}

export default mongoose.connection;
