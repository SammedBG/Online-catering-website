import express from "express";
import { getReviews, createReview, getAllReviews, deleteReview } from "../controllers/reviewController.js";
import { auth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/all", auth, isAdmin, getAllReviews);
router.post("/", auth, createReview);
router.delete("/:id", auth, isAdmin, deleteReview);

export default router;