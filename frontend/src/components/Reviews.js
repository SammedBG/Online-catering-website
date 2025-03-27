"use client";

import "../styles/Review.css";

const Reviews = ({ reviews }) => {
  return (
    <div className="review-container">
      <h2>Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <strong>{review.name}</strong> - {review.rating} ★<p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;