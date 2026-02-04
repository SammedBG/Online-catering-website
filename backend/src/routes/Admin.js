import express from "express";
import Booking from "../models/booking.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { getIO } from "../socket.js";
import { sendUserBookingConfirmation } from "../utils/emailService.js";

const router = express.Router();

router.get("/bookings", auth, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 }).populate("user", "name email");
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/bookings/:id", auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(
      "user",
      "name email"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Send Real-time Update
    try {
        getIO().emit("bookingUpdated", booking);
        if (status === 'confirmed') {
             getIO().emit("bookingConfirmed", booking);
        }
    } catch (e) {
        console.error("Socket emit failed", e);
    }

    // Send Email if Confirmed
    if (status === 'confirmed' && booking.user && booking.user.email) {
        try {
            await sendUserBookingConfirmation(booking, booking.user.email);
        } catch (emailError) {
            console.error("Failed to send user confirmation:", emailError);
        }
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    
    // Get booking stats for each user (optional, but useful)
    const usersWithStats = await Promise.all(users.map(async (user) => {
        const bookingCount = await Booking.countDocuments({ user: user._id });
        return { ...user.toObject(), bookingCount };
    }));

    res.json(usersWithStats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
