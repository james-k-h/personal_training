import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  purchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Purchase',
    required: true,
  },
  scheduledDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: 60, // minutes
  },
  location: String,
  notes: String,
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SessionSchema.index({ userId: 1, scheduledDate: 1 });

export default mongoose.models.Session ||
  mongoose.model('Session', SessionSchema);
