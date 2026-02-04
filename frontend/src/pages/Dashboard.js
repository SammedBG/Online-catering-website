import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserBookings, cancelBooking } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' or 'history'
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

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const total = bookings.length;
    const upcoming = bookings.filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate >= today && (b.status === 'pending' || b.status === 'confirmed');
    }).length;
    const completed = bookings.filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate < today && b.status === 'confirmed';
    }).length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;

    return { total, upcoming, completed, cancelled };
  }, [bookings]);

  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === "upcoming") {
      return bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate >= today && b.status !== 'cancelled';
      }).sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      // History: past bookings + cancelled
      return bookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate < today || b.status === 'cancelled';
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }, [bookings, activeTab]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(bookingId);
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      {/* Header with Quick Action */}
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <Link to="/booking" className="book-new-btn">+ Book New Event</Link>
      </div>

      {/* Stats Cards */}
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
            <h3>Completed</h3>
            <p>{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Bookings Section with Tabs */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>My Bookings</h2>
          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
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

        {filteredBookings.length > 0 ? (
          <div className="table-responsive">
            <table className="booking-history">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => {
                  const bookingDate = new Date(booking.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isPast = bookingDate < today;

                  return (
                    <tr key={booking._id}>
                      <td className="event-type">{booking.eventType}</td>
                      <td>{bookingDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td>{booking.time}</td>
                      <td>{booking.guests}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        {booking.status === 'pending' && !isPast ? (
                          <button 
                            className="cancel-btn"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel
                          </button>
                        ) : isPast && booking.status === 'confirmed' ? (
                          <span className="completed-text">Event Complete</span>
                        ) : (
                          <span className="completed-text">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>
              {activeTab === 'upcoming' 
                ? "No upcoming events. Plan your next celebration!" 
                : "No past bookings yet."}
            </p>
            {activeTab === 'upcoming' && (
              <Link to="/booking">Book an Event Now →</Link>
            )}
          </div>
        )}
      </section>

      {/* User Profile Section */}
      <section className="dashboard-section">
        <h2>Profile Information</h2>
        <dl className="user-info">
          <dt>Name</dt>
          <dd>{user.name}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>
    </div>
  );
};

export default Dashboard;