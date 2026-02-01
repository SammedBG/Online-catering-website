import express from "express";
import Booking from "../models/booking.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

import { getIO } from "../socket.js";
import { sendOwnerBookingNotification, sendUserBookingConfirmation } from "../utils/emailService.js";

const router = express.Router();

// Create a new booking
router.post("/", auth, async (req, res) => {
  try {
    const { eventType, date, time, guests, venue, foodType, serviceType, contactPhone, additionalInfo } = req.body;
    const newBooking = new Booking({
      user: req.user.id,
      eventType,
      date,
      time,
      guests,
      venue,
      foodType,
      serviceType,
      contactPhone,
      additionalInfo,
    });
    await newBooking.save();

    getIO().emit("newBooking", newBooking);

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

// Cancel booking (user only)
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    getIO().emit("bookingUpdated", booking); // Notify admin

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Confirm booking via email link
router.get("/confirm/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "confirmed" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    const user = await User.findById(booking.user);

    try {
      await sendUserBookingConfirmation(booking, user.email);
    } catch (emailError) {
      console.error("Failed to send user confirmation:", emailError);
    }

    getIO().emit("bookingConfirmed", booking);

    // Redirect to frontend dashboard or success page
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?status=confirmed`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;