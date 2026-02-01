import express from "express";
import BlockedDate from "../models/BlockedDate.js";
import Booking from "../models/booking.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Get all unavailable dates (Blocked + Confirmed Bookings)
router.get("/", async (req, res) => {
  try {
    // 1. Get manually blocked dates
    const blockedDates = await BlockedDate.find({}, "date reason");

    // 2. Get dates with confirmed bookings (Optional: You might want to allow multiple bookings per day, 
    // but for now let's assume if it's confirmed, it might be busy. 
    // Actually, usually catering can do multiple, so maybe only return explicitly blocked dates 
    // OR dates that are "fully booked" if you had a capacity logic.
    // For this request, we'll return explicitly blocked dates AND confirmed bookings if the user wants to see them.
    // However, usually "Availability Calendar" implies what the USER cannot pick.
    // Let's return both lists separately so frontend can decide how to show them.
    
    // For simplicity: A date is unavailable if it is in BlockedDate.
    // We can also check if there are "too many" bookings on a day, but let's stick to explicit blocks for now.
    
    res.json({ blockedDates });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Block a date (Admin only)
router.post("/block", auth, async (req, res) => {
  try {
    // Check if user is admin (Assuming middleware adds user to req)
    // You might need a specific check like: if (req.user.role !== 'admin') ...
    
    const { date, reason } = req.body;
    
    if (!date) return res.status(400).json({ message: "Date is required" });

    // Check if already blocked
    const existing = await BlockedDate.findOne({ date: new Date(date) });
    if (existing) {
        return res.status(400).json({ message: "Date is already blocked" });
    }

    const newBlock = new BlockedDate({
        date: new Date(date),
        reason: reason || "Unavailable"
    });

    await newBlock.save();
    res.json(newBlock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Unblock a date (Admin only)
router.delete("/unblock/:date", auth, async (req, res) => {
    try {
        const dateParam = new Date(req.params.date);
        await BlockedDate.findOneAndDelete({ date: dateParam });
        res.json({ message: "Date unblocked" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
