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
    // Removed enum restriction to allow all package types
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['personal-training', 'massage', 'rehab'],
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

// Add index for better query performance
PurchaseSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Purchase ||
  mongoose.model('Purchase', PurchaseSchema);
