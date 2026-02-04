import mongoose from "mongoose";

const blockedDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  reason: {
    type: String,
    enum: ['Fully Booked', 'Holiday', 'Maintenance', 'Other'],
    default: 'Fully Booked'
  },
  note: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster date queries
blockedDateSchema.index({ date: 1 });

const BlockedDate = mongoose.model("BlockedDate", blockedDateSchema);

export default BlockedDate;
