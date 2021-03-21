const express = require('express')
const router = express.Router()
const middleware = require('../utils/middleware')
const postController = require('../controllers/postController')

router.post('/', middleware.verifyToken, postController.addPost);

router.get('/', postController.getAllPosts);

router.get('/:id', [middleware.verifyToken, middleware.getPost], postController.getPostById);

router.put('/:id', [middleware.verifyToken, middleware.getPost], postController.updatePost);

router.delete('/:id', [middleware.verifyToken, middleware.getPost], postController.deletePost);

router.put('/like/:id', [middleware.verifyToken, middleware.getPost], postController.likePost);

router.put('/unlike/:id', [middleware.verifyToken, middleware.getPost], postController.unlikePost);

router.put('/comment/:id', [middleware.verifyToken, middleware.getPost], postController.commentOnPost);

module.exports = router;
