import mongoose from 'mongoose';

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
    comments: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }
    }],
    likes: [],
    visits: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Post', postSchema);
