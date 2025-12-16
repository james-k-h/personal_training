import mongoose from 'mongoose';

const BookedSessionSchema = new mongoose.Schema({
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
  scheduledTime: {
    type: String,
    required: true, // Format: "09:00 AM"
  },
  duration: {
    type: Number,
    default: 60, // minutes
  },
  location: {
    type: String,
    default: 'Main Gym',
  },
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

BookedSessionSchema.index({ userId: 1, scheduledDate: 1 });

export default mongoose.models.BookedSession ||
  mongoose.model('BookedSession', BookedSessionSchema);
