import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { createServer } from "http"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import hpp from "hpp"
import compression from "compression"
import { initSocket } from "./socket.js"

import authRoutes from "./routes/auth.js"
import bookingRoutes from "./routes/booking.js"
import adminRoutes from "./routes/admin.js"
import reviewRoutes from "./routes/review.js"

dotenv.config();


const app = express()
const httpServer = createServer(app)

// Initialize Socket.IO
initSocket(httpServer)

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()) // Security headers
app.use(mongoSanitize()) // Prevent NoSQL injection
app.use(hpp()) // Prevent HTTP Parameter Pollution
app.use(compression()) // Compress responses
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
  }),
)
app.use(express.json())

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

