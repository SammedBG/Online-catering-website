import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventType: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    venue: { type: String, required: true },
    foodType: { type: String }, // e.g. North Indian, South Indian
    serviceType: { type: String }, // e.g. Buffet, Leaf Service
    contactPhone: { type: String, required: true },
    additionalInfo: { type: String },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true },
)

export default mongoose.model("Booking", bookingSchema)

