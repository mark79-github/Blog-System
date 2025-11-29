import { Router } from 'express';
import * as middleware from '../utils/middleware.js';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/:id', [middleware.getUser], userController.getUserById);

export default router;

