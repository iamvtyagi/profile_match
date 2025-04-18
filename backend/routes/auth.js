import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   POST /api/register
// @desc    Register a user (development purposes)
// @access  Public
router.post('/register', register);

export default router;