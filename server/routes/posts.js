const express = require('express')
const router = express.Router()
const middleware = require('../utils/middleware')
const postController = require('../controllers/postController')

router.post('/', middleware.verifyToken, postController.addPost);

router.get('/', postController.getAllPosts);

// router.get('/:id', [middleware.verifyToken, middleware.getPost], postController.getPostById);
router.get('/:id', [middleware.getPost], postController.getPostById);

router.patch('/:id', [middleware.verifyToken, middleware.getPost], postController.updatePost);

router.delete('/:id', [middleware.verifyToken, middleware.getPost], postController.deletePost);

router.put('/like/:id', [middleware.verifyToken, middleware.getPost], postController.likePost);

router.put('/unlike/:id', [middleware.verifyToken, middleware.getPost], postController.unlikePost);

router.put('/comment/:id', [middleware.verifyToken, middleware.getPost], postController.commentOnPost);

router.delete('/comment/:id/delete/:commentId', [middleware.verifyToken, middleware.getPost], postController.deleteCommentOnPost);

router.post('/visit/:id', [middleware.getPost], postController.visitPost);

module.exports = router;
