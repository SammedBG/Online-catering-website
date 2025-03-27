import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../services/api"; // Updated import
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await getUserBookings();
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>

      <section className="dashboard-section">
        <h2>User Information</h2>
        <dl className="user-info">
          <dt>Name:</dt>
          <dd>{user.name}</dd>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>

      <section className="dashboard-section">
        <h2>Booking History</h2>
        {bookings.length > 0 ? (
          <table className="booking-history">
            <thead>
              <tr>
                <th>Event Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.eventType}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;