import express from "express";
import Booking from "../models/booking.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js"; // Adjust path if needed
import { io } from "../server.js";
import { sendOwnerBookingNotification, sendUserBookingConfirmation } from "../utils/emailService.js";

const router = express.Router();

// Create a new booking
router.post("/", auth, async (req, res) => {
  try {
    const { eventType, date, time, guests, additionalInfo } = req.body;
    const newBooking = new Booking({
      user: req.user.id,
      eventType,
      date,
      time,
      guests,
      additionalInfo,
    });
    await newBooking.save();

    io.emit("newBooking", newBooking);

    try {
      await sendOwnerBookingNotification(newBooking);
    } catch (emailError) {
      console.error("Failed to send owner notification:", emailError);
    }

    res.status(201).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user-specific bookings
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("user", "name email")
      .sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all bookings (admin only)
router.get("/admin/bookings", auth, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update booking status (admin only)
router.put("/admin/bookings/:id", auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const user = await User.findById(booking.user);

    try {
      await sendUserBookingConfirmation(booking, user.email);
    } catch (emailError) {
      console.error("Failed to send user confirmation:", emailError);
    }

    io.emit("bookingConfirmed", booking);

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;