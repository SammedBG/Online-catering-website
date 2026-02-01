import mongoose from "mongoose";

const BlockedDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // Prevent multiple blocks for the same day
  },
  reason: {
    type: String,
    default: "Fully Booked",
  },
});

export default mongoose.model("BlockedDate", BlockedDateSchema);
