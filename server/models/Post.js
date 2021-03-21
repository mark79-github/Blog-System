const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    urlToImage: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now(),
    },
    comments: [],
    likes: [],
    readers: []
});

module.exports = mongoose.model('Post', postSchema);

