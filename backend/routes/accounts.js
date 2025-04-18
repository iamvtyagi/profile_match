import express from 'express';
import { 
  getAccounts, 
  getAccountById, 
  createAccount, 
  updateAccountStatus 
} from '../controllers/accountController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/accounts
// @desc    Get all accounts
// @access  Private
router.get('/accounts', auth, getAccounts);

// @route   GET /api/accounts/:id
// @desc    Get account by ID
// @access  Private
router.get('/accounts/:id', auth, getAccountById);

// @route   POST /api/accounts
// @desc    Create a new account
// @access  Private
router.post('/accounts', auth, createAccount);

// @route   POST /api/accounts/:id/status
// @desc    Update account status
// @access  Private
router.post('/accounts/:id/status', auth, updateAccountStatus);

export default router;