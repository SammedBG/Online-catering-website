import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserBookings, cancelBooking } from "../services/api";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'
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

  const stats = useMemo(() => {
    const now = new Date();
    return {
        total: bookings.length,
        upcoming: bookings.filter(b => b.status === 'confirmed' && new Date(b.date) >= now).length,
        completed: bookings.filter(b => b.status === 'confirmed' && new Date(b.date) < now).length
    };
  }, [bookings]);

  const displayedBookings = bookings.filter(b => {
      const isPast = new Date(b.date) < new Date();
      if (activeTab === 'active') return !isPast && b.status !== 'cancelled';
      return isPast || b.status === 'cancelled';
  });

  if (!user) return null;

  const getStatusClass = (status) => {
      switch (status) {
          case 'confirmed': return 'status-confirmed';
          case 'cancelled': return 'status-cancelled';
          default: return 'status-pending';
      }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
          <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
          <Link to="/booking" className="book-new-btn">+ Book New Event</Link>
      </div>

      {/* User Stats Summary */}
      <div className="user-stats-grid">
          <div className="user-stat-card">
              <div className="icon">📅</div>
              <div className="info">
                  <h3>Total Bookings</h3>
                  <p>{stats.total}</p>
              </div>
          </div>
          <div className="user-stat-card highlight">
              <div className="icon">🚀</div>
              <div className="info">
                  <h3>Upcoming Events</h3>
                  <p>{stats.upcoming}</p>
              </div>
          </div>
          <div className="user-stat-card">
              <div className="icon">✅</div>
              <div className="info">
                  <h3>Completed Events</h3>
                  <p>{stats.completed}</p>
              </div>
          </div>
      </div>

      <section className="dashboard-section main-content">
        <div className="section-header">
            <h2>Your Bookings</h2>
            <div className="tabs">
                <button 
                    className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Active & Upcoming
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    History & Cancelled
                </button>
            </div>
        </div>

        {displayedBookings.length > 0 ? (
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
                {displayedBookings.map((booking) => (
                    <tr key={booking._id}>
                    <td><span className="event-type">{booking.eventType}</span></td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.time}</td>
                    <td>{booking.guests}</td>
                    <td><span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status}</span></td>
                    <td>
                        {booking.status === 'pending' && (
                            <button className="cancel-btn" onClick={() => handleCancelBooking(booking._id)}>Cancel</button>
                        )}
                        {booking.status === 'confirmed' && new Date(booking.date) < new Date() && (
                            <span className="completed-text">Completed</span>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
              <p>No bookings found in this category.</p>
              {activeTab === 'active' && <Link to="/booking">Plan your next event now!</Link>}
          </div>
        )}
      </section>

      <section className="dashboard-section profile-section">
        <h2>My Profile</h2>
        <dl className="user-info">
          <dt>Name:</dt>
          <dd>{user.name}</dd>
          <dt>Email:</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>
    </div>
  );
};

export default Dashboard;