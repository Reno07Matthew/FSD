const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { upload, handleMulterError } = require('../config/multer');
const { validateUserRegistration, validateUserUpdate } = require('../middleware/validation');

// Routes

// POST /api/users/register - Register a new user
router.post('/register', 
  upload.single('profile_picture'),
  handleMulterError,
  validateUserRegistration,
  UserController.register
);

// GET /api/users - Get all users
router.get('/', UserController.getAllUsers);

// GET /api/users/stats - Get user statistics
router.get('/stats', UserController.getUserStats);

// GET /api/users/:id - Get user by ID
router.get('/:id', UserController.getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', 
  upload.single('profile_picture'),
  handleMulterError,
  validateUserUpdate,
  UserController.updateUser
);

// DELETE /api/users/:id - Delete user
router.delete('/:id', UserController.deleteUser);

// PUT /api/users/:id/confirm-email - Confirm user email
router.put('/:id/confirm-email', UserController.confirmEmail);

module.exports = router;
