import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  packageType: {
    type: String,
    required: true,
    enum: ['single', 'package-5', 'package-10', 'monthly'],
  },
  sessionsRemaining: {
    type: Number,
    required: true,
  },
  stripePaymentId: String,
  amount: Number,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: Date,
});

export default mongoose.models.Purchase ||
  mongoose.model('Purchase', PurchaseSchema);
