import Account from '../models/Account.js';

// @route   GET /api/accounts
// @desc    Get all accounts
// @access  Private
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ matchScore: -1 });
    res.json(accounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/accounts/:id
// @desc    Get account by ID
// @access  Private
export const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json(account);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   POST /api/accounts
// @desc    Create a new account
// @access  Private
export const createAccount = async (req, res) => {
  const { companyName, matchScore } = req.body;

  try {
    // Create new account
    const newAccount = new Account({
      companyName,
      matchScore
    });

    const account = await newAccount.save();
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   POST /api/accounts/:id/status
// @desc    Update account status
// @access  Private
export const updateAccountStatus = async (req, res) => {
  const { status } = req.body;

  // Check if status is valid
  if (!['Target', 'Not Target'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    let account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Update status
    account = await Account.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(account);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};