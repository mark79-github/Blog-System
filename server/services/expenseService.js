const {Post, User} = require('../models');

function getById(postId) {
    return Post
        .findById(postId).lean()
        .map(x => {
            return x;
        });
}

function getAll(userId) {
    return Post
        .find({user: userId})
        .lean();
}

function remove(postId) {
    return Post.findByIdAndDelete(postId);
}

function create(data, userId) {

    let {merchant, total, category, description, report} = data;
    report = !!report;

    return User.findById(userId)
        .then(user => {
            const expense = new Expense({merchant, total, category, description, report, user: userId});
            return Promise.all([user, expense.save()]);
        }).then(([u, e]) => {
            u.expenses.push(e._id);
            return u.save();
        });

}

module.exports = {
    getById,
    getAll,
    create,
    remove,
}
