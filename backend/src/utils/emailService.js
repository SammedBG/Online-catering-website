import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config() // Load environment variables

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_PORT == "465", // Correct secure setting
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Prevent TLS handshake issues
  },
})

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    })
    console.log("✅ Password reset email sent successfully")
  } catch (error) {
    console.error("❌ Error sending password reset email:", error.message, error.response || error)
    throw error
  }
}

export const sendOwnerBookingNotification = async (booking) => {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const confirmUrl = `${backendUrl}/api/bookings/confirm/${booking._id}`;
    console.log('Confirmation URL:', confirmUrl);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.OWNER_EMAIL,
      subject: "New Booking Notification",
      html: `
        <h1>New Booking Received</h1>
        <p>A new booking has been made:</p>
        <ul>
          <li>Event Type: ${booking.eventType}</li>
          <li>Date: ${new Date(booking.date).toLocaleDateString()}</li>
          <li>Time: ${booking.time}</li>
          <li>Guests: ${booking.guests}</li>
          <li>Additional Info: ${booking.additionalInfo || "None"}</li>
        </ul>
        <p><a href="${confirmUrl}">Click here to confirm the booking</a></p>
      `,
    })
    console.log("Owner booking notification email sent")
  } catch (error) {
    console.error("Error sending owner booking notification email:", error)
    throw error
  }
}


export const sendUserBookingConfirmation = async (booking, userEmail) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: userEmail,
      subject: "✅ Your Booking is Confirmed!",
      html: `
        <h1 style="color: blue;">Booking Confirmed!</h1>
        <p>Thank you for choosing <strong>Shree Mahaveer Inchal Canteen</strong>!</p>
        <p><strong>Event Type:</strong> ${booking.eventType || "N/A"}</p>
        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString() || "N/A"}</p>
        <p><strong>Time:</strong> ${booking.time || "N/A"}</p>
        <p><strong>Guests:</strong> ${booking.guests || "N/A"}</p>
        <p>We look forward to serving you! 🎉</p>
      `,
    });
    console.log("✅ User booking confirmation email sent successfully");
  } catch (error) {
    console.error("❌ Error sending user booking confirmation:", error.message, error.response || error);
    throw error;
  }
};
