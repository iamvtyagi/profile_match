import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['Target', 'Not Target'],
    default: 'Not Target'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the timestamp before updating
accountSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

const Account = mongoose.model('Account', accountSchema);

export default Account;