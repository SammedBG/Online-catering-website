import React, { useState, useEffect } from "react";
import { getAdminBookings, updateBookingStatus } from "../services/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAdminBookings();
      console.log("Bookings fetched:", response.data); // Debug
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      setError("Failed to fetch bookings: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      fetchBookings(); // Refresh bookings after update
    } catch (error) {
      console.error("Error updating booking status:", error.response?.data || error.message);
      setError("Failed to update booking status: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Event Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.eventType}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.user.name}</td>
                <td>{booking.status}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;