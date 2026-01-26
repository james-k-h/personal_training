import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  funFact: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  availability: {
    type: Map,
    of: [String],
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StaffSchema.index({ isActive: 1 });
StaffSchema.index({ role: 1 });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
