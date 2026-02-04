import Review from "../models/Review.js";
import User from "../models/User.js"; // Import User model

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    console.log("Received:", { rating, comment, user: req.user }); // Debug
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5" });
    }
    if (comment === undefined || comment === null) {
      return res.status(400).json({ message: "Comment is required" });
    }

    // Fetch user from database using req.user.id
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReview = new Review({
      user: req.user.id,
      name: user.name, // Use the name from the database
      rating,
      comment: comment || "",
    });
    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error("Mongoose error:", error.message); // Debug
    res.status(400).json({ message: "Error submitting review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.deleteOne();
    res.json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};