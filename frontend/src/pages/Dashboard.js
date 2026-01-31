import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserBookings, cancelBooking } from "../services/api";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
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

    // Socket.IO connection
    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    socket.on("bookingConfirmed", (updatedBooking) => {
       setBookings((prevBookings) =>
        prevBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
      );
    });

    socket.on("bookingUpdated", (updatedBooking) => {
        setBookings((prevBookings) =>
         prevBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
       );
     });

    return () => {
      socket.disconnect();
    };
  }, [user, navigate]);


  const handleCancelBooking = async (bookingId) => {
      if(!window.confirm("Are you sure you want to cancel this booking?")) return;
      try {
          const response = await cancelBooking(bookingId);
          setBookings((prevBookings) =>
            prevBookings.map((b) => (b._id === response.data._id ? response.data : b))
          );
      } catch (error) {
          console.error("Error cancelling booking:", error);
          alert(error.response?.data?.message || "Failed to cancel booking");
      }
  }

  if (!user) {
    return null;
  }

  const getStatusClass = (status) => {
      switch (status) {
          case 'confirmed': return 'status-confirmed';
          case 'cancelled': return 'status-cancelled';
          default: return 'status-pending';
      }
  };

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
          <div className="table-responsive">
            <table className="booking-history">
                <thead>
                <tr>
                    <th>Event Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
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
                    <td><span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status}</span></td>
                    <td>
                        {booking.status === 'pending' && (
                            <button className="cancel-btn" onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;