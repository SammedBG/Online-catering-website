import React, { useState, useEffect } from "react";
import { getAdminBookings, updateBookingStatus } from "../services/api";
import io from "socket.io-client";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();

    // Socket.IO connection
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    socket.on("newBooking", (newBooking) => {
        // Optimistically add the new booking to the list, sorting by date might be needed if not strict
        setBookings((prev) => [...prev, newBooking].sort((a,b) => new Date(a.date) - new Date(b.date)));
    });

    socket.on("bookingConfirmed", (updatedBooking) => {
         setBookings((prev) => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b));
    });

    socket.on("bookingUpdated", (updatedBooking) => {
        setBookings((prev) => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b));
   });

    return () => {
        socket.disconnect();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAdminBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      setError("Failed to fetch bookings: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      // Socket will handle the UI update, but we can do it optimistically too:
      setBookings(prev => prev.map(b => b._id === bookingId ? {...b, status: newStatus} : b));
    } catch (error) {
      console.error("Error updating booking status:", error.response?.data || error.message);
      setError("Failed to update booking status: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
        case 'confirmed': return 'status-confirmed';
        case 'cancelled': return 'status-cancelled';
        default: return 'status-pending';
    }
};

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <div className="table-responsive">
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
                    <td>{booking.user?.name || 'Unknown'}</td>
                    <td><span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status}</span></td>
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
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;