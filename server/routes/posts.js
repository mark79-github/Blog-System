import { Router } from 'express';
import * as middleware from '../utils/middleware.js';
import * as postController from '../controllers/postController.js';

const router = Router();

router.post('/', middleware.verifyToken, postController.addPost);

router.get('/', postController.getAllPosts);

router.get('/:id', [middleware.getPost], postController.getPostById);

router.patch('/:id', [middleware.verifyToken, middleware.getPost], postController.updatePost);

router.delete('/:id', [middleware.verifyToken, middleware.getPost], postController.deletePost);

router.put('/like/:id', [middleware.verifyToken, middleware.getPost], postController.likePost);

router.put('/unlike/:id', [middleware.verifyToken, middleware.getPost], postController.unlikePost);

router.put('/comment/:id', [middleware.verifyToken, middleware.getPost], postController.commentOnPost);

router.delete('/comment/:id/delete/:commentId', [middleware.verifyToken, middleware.getPost], postController.deleteCommentOnPost);

router.post('/visit/:id', [middleware.getPost], postController.visitPost);

export default router;
