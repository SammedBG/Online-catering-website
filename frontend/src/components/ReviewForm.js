"use client";

import { useState } from "react";
import { createReview } from "../services/api";
import "../styles/Review.css";

const ReviewForm = ({ fetchReviews }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setMessage("Comment cannot be empty");
      return;
    }
    console.log("Submitting:", { rating, comment });
    try {
      const response = await createReview({ rating, comment });
      console.log("Success:", response.data);
      setMessage(response.data.message);
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error("Error:", error.response?.data, error.response?.status);
      setMessage(
        error.response?.status === 401
          ? "Please log in to submit a review"
          : error.response?.data?.message || "Error submitting review"
      );
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>
      {message && <p className="message">{message}</p>}
      <form onSubmit={submitReview}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
              <span className="star">★</span>
            </option>
          ))}
        </select>

        <label>Comment:</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;