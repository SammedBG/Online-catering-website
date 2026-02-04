import express from "express";
import BlockedDate from "../models/BlockedDate.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Get all blocked dates (public route - users need to see this)
router.get("/", async (req, res) => {
  try {
    const blockedDates = await BlockedDate.find().sort({ date: 1 });
    res.json(blockedDates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get blocked dates for admin with full details
router.get("/admin", auth, isAdmin, async (req, res) => {
  try {
    const blockedDates = await BlockedDate.find()
      .populate("createdBy", "name email")
      .sort({ date: 1 });
    res.json(blockedDates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Block a date (admin only)
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const { date, reason, note } = req.body;

    // Check if date is already blocked
    const existing = await BlockedDate.findOne({ date: new Date(date) });
    if (existing) {
      return res.status(400).json({ message: "This date is already blocked" });
    }

    const blockedDate = new BlockedDate({
      date: new Date(date),
      reason: reason || 'Fully Booked',
      note: note || '',
      createdBy: req.user.id
    });

    await blockedDate.save();
    res.status(201).json(blockedDate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Unblock a date (admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const blockedDate = await BlockedDate.findByIdAndDelete(req.params.id);
    
    if (!blockedDate) {
      return res.status(404).json({ message: "Blocked date not found" });
    }

    res.json({ message: "Date unblocked successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
