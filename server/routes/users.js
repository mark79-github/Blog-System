const express = require('express');
const middleware = require('../utils/middleware');
const userController = require('../controllers/userController');

const router = express.Router();

// router.get('/', userController.getAllUsers);

// router.get('/:id', [middleware.verifyToken, middleware.getUser], userController.getUserById);
router.get('/:id', [middleware.getUser], userController.getUserById);

module.exports = router;
