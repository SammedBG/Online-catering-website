import React, { useState, useEffect, useMemo } from "react";
import { getAdminBookings, updateBookingStatus, getUsers, getAdminReviews, deleteReview } from "../services/api";
import io from "socket.io-client";
import Calendar from "react-calendar";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import BookingDetailsModal from "../components/BookingDetailsModal";
import "react-calendar/dist/Calendar.css";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings', 'availability', 'users', 'reviews'
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchUsers();
    fetchReviews();

// ... existing socket code ...

    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    socket.on("newBooking", (newBooking) => {
        setBookings((prev) => [...prev, newBooking].sort((a,b) => new Date(a.date) - new Date(b.date)));
    });

    socket.on("bookingConfirmed", (updatedBooking) => {
        setBookings((prev) => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b));
        if (selectedBooking && selectedBooking._id === updatedBooking._id) {
            setSelectedBooking(updatedBooking);
        }
    });

    socket.on("bookingUpdated", (updatedBooking) => {
        setBookings((prev) => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b));
        if (selectedBooking && selectedBooking._id === updatedBooking._id) {
            setSelectedBooking(updatedBooking);
        }
    });

    return () => {
        socket.disconnect();
    }
  }, [selectedBooking]);

  const fetchBookings = async () => {
    try {
      const response = await getAdminBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      setError("Failed to fetch bookings");
    }
  };

  const fetchUsers = async () => {
      try {
          const response = await getUsers();
          setUsers(response.data);
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  };

  const fetchReviews = async () => {
      try {
          const response = await getAdminReviews();
          setReviews(response.data);
      } catch (error) {
          console.error("Error fetching reviews:", error);
      }
  };

  const handleDeleteReview = async (id) => {
      if (!window.confirm("Are you sure you want to delete this review?")) return;
      try {
          await deleteReview(id);
          setReviews(prev => prev.filter(r => r._id !== id));
      } catch (error) {
          console.error("Error deleting review:", error);
          alert("Failed to delete review");
      }
  };
// ... rest of the functions


  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await updateBookingStatus(bookingId, newStatus);
      const updatedBooking = response.data;
      
      setBookings(prev => prev.map(b => b._id === bookingId ? updatedBooking : b));
      if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking(updatedBooking);
      }
    } catch (error) {
      setError("Failed to update status");
    }
  };

  const handleViewBooking = (booking) => {
      setSelectedBooking(booking);
  };

  const closeBookingModal = () => {
      setSelectedBooking(null);
  };

  const downloadCSV = () => {
      const headers = ["Event Type,Date,Time,Guests,User,Status"];
      const rows = bookings.map(b => 
          `${b.eventType},${new Date(b.date).toLocaleDateString()},${b.time},${b.guests},${b.user?.name || 'Unknown'},${b.status}`
      );
      const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "bookings.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  // Stats Calculation
  const stats = useMemo(() => {
    // 1. Basic Stats
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const guests = bookings.reduce((acc, curr) => acc + (parseInt(curr.guests) || 0), 0);

    // 2. Monthly Trends
    const monthlyData = {};
    bookings.forEach(b => {
        const monthYear = new Date(b.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
    });

    // 3. Popular Event Types
    const eventCounts = {};
    bookings.forEach(b => {
        eventCounts[b.eventType] = (eventCounts[b.eventType] || 0) + 1;
    });
    
    // Sort events by popularity
    const sortedEvents = Object.entries(eventCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5); // Top 5

    return {
        total,
        pending,
        confirmed,
        guests,
        monthlyBookings: monthlyData,
        popularEvents: sortedEvents
    };
  }, [bookings]);

  const filteredBookings = bookings.filter(b => 
      b.eventType.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (b.user?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
        case 'confirmed': return 'status-confirmed';
        case 'cancelled': return 'status-cancelled';
        default: return 'status-pending';
    }
  };

  const tileContent = ({ date, view }) => {
      if (view === 'month') {
          const dayBookings = bookings.filter(b => new Date(b.date).toDateString() === date.toDateString());
          if (dayBookings.length > 0) {
              return <div className="calendar-dot-container">
                  {dayBookings.map((b, i) => (
                      <span key={i} className={`calendar-dot ${b.status}`}></span>
                  ))}
              </div>
          }
      }
  };

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
          <div className="stat-card">
              <h3>Total Bookings</h3>
              <p className="stat-number">{stats.total}</p>
          </div>
          <div className="stat-card pending">
              <h3>Pending Requests</h3>
              <p className="stat-number">{stats.pending}</p>
          </div>
          <div className="stat-card confirmed">
              <h3>Confirmed Events</h3>
              <p className="stat-number">{stats.confirmed}</p>
          </div>
          <div className="stat-card guests">
              <h3>Total Guests</h3>
              <p className="stat-number">{stats.guests}</p>
          </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
          <button 
              className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
          >
              📋 Bookings Management
          </button>
          <button 
              className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
          >
              👥 User Management
          </button>
          <button 
              className={`admin-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
          >
              ⭐ Reviews
          </button>
          <button 
              className={`admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
          >
              📈 Analytics
          </button>
          <button 
              className={`admin-tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
              onClick={() => setActiveTab('availability')}
          >
              🗓️ Availability Management
          </button>
      </div>

      {/* Conditional Content Based on Active Tab */}
      {activeTab === 'bookings' && (
          <>

      <div className="dashboard-toolbar">
          <div className="search-box">
              <input 
                  type="text" 
                  placeholder="Search bookings..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
          <div className="actions">
              <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
              >
                  List View
              </button>
              <button 
                  className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                  onClick={() => setViewMode('calendar')}
              >
                  Calendar
              </button>
              <button className="export-btn" onClick={downloadCSV}>
                  Export CSV
              </button>
          </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {viewMode === 'list' ? (
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
                {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                <tr key={booking._id}>
                    <td>{booking.eventType}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>{booking.time}</td>
                    <td>{booking.guests}</td>
                    <td>{booking.user?.name || 'Unknown'}</td>
                    <td><span className={`status-badge ${getStatusClass(booking.status)}`}>{booking.status}</span></td>
                    <td>
                        <button 
                            className="view-details-btn"
                            onClick={() => handleViewBooking(booking)}
                        >
                            View Details
                        </button>
                    </td>
                </tr>
                )) : (
                    <tr><td colSpan="7" style={{textAlign: 'center'}}>No bookings match your search.</td></tr>
                )}
            </tbody>
            </table>
        </div>
      ) : (
          <div className="calendar-view">
              <Calendar 
                  tileContent={tileContent}
                  value={new Date()}
              />
              <div className="calendar-legend">
                  <div className="legend-item"><span className="dot pending"></span> Pending</div>
                  <div className="legend-item"><span className="dot confirmed"></span> Confirmed</div>
                  <div className="legend-item"><span className="dot cancelled"></span> Cancelled</div>
              </div>
          </div>
      )}
          </>
      )}
      
      {activeTab === 'users' && (
          <div className="users-section">
              <div className="section-header">
                  <h2>Registered Users ({users.length})</h2>
              </div>
              <div className="table-responsive">
                  <table className="bookings-table">
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Joined Date</th>
                              <th>Total Bookings</th>
                          </tr>
                      </thead>
                      <tbody>
                          {users.length > 0 ? users.map(user => (
                              <tr key={user._id}>
                                  <td><div className="user-avatar-cell">
                                      <div className="avatar-small">{user.name.charAt(0)}</div>
                                      {user.name}
                                  </div></td>
                                  <td>{user.email}</td>
                                  <td>
                                      <span className={`role-badge ${user.role}`}>
                                          {user.role}
                                      </span>
                                  </td>
                                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                  <td>{user.bookingCount || 0}</td>
                              </tr>
                          )) : (
                              <tr><td colSpan="5" style={{textAlign: 'center'}}>No users found.</td></tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>

      )}

      {activeTab === 'reviews' && (
          <div className="reviews-section">
              <div className="section-header">
                  <h2>Customer Reviews ({reviews.length})</h2>
              </div>
               <div className="table-responsive">
                  <table className="bookings-table">
                      <thead>
                          <tr>
                              <th>Customer</th>
                              <th>Rating</th>
                              <th>Comment</th>
                              <th>Date</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {reviews.length > 0 ? reviews.map(review => (
                              <tr key={review._id}>
                                  <td>{review.name || 'Anonymous'}</td>
                                  <td>
                                      <span className="star-rating">
                                          {'⭐'.repeat(review.rating)}
                                      </span> 
                                      <span className="rating-number">({review.rating}/5)</span>
                                  </td>
                                  <td>
                                      <div className="review-comment">"{review.comment}"</div>
                                  </td>
                                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                  <td>
                                      <button 
                                          className="delete-btn"
                                          onClick={() => handleDeleteReview(review._id)}
                                          title="Delete Review"
                                      >
                                          🗑️
                                      </button>
                                  </td>
                              </tr>
                          )) : (
                              <tr><td colSpan="5" style={{textAlign: 'center'}}>No reviews found.</td></tr>
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      )}



      {activeTab === 'analytics' && (
          <div className="analytics-section">
              <div className="section-header">
                  <h2>Business Insights</h2>
              </div>
              
              <div className="analytics-grid">
                  {/* Monthly Trends Chart */}
                  <div className="analytics-card">
                      <h3>Monthly Booking Trends</h3>
                      <div className="chart-container">
                          {Object.keys(stats.monthlyBookings).length > 0 ? (
                              Object.entries(stats.monthlyBookings).map(([month, count]) => (
                                  <div key={month} className="chart-bar-row">
                                      <span className="chart-label">{month}</span>
                                      <div className="chart-bar-wrapper">
                                          <div 
                                              className="chart-bar" 
                                              style={{ width: `${(count / Math.max(...Object.values(stats.monthlyBookings))) * 100}%` }}
                                          >
                                              <span className="chart-value">{count}</span>
                                          </div>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <p className="no-data">No booking data available yet.</p>
                          )}
                      </div>
                  </div>

                  {/* Popular Events Chart */}
                  <div className="analytics-card">
                      <h3>Top Event Types</h3>
                      <div className="chart-container">
                          {stats.popularEvents.length > 0 ? (
                              stats.popularEvents.map(([event, count]) => (
                                  <div key={event} className="chart-bar-row">
                                      <span className="chart-label">{event}</span>
                                      <div className="chart-bar-wrapper">
                                          <div 
                                              className="chart-bar secondary" 
                                              style={{ width: `${(count / Math.max(...stats.popularEvents.map(([,c]) => c))) * 100}%` }}
                                          >
                                              <span className="chart-value">{count}</span>
                                          </div>
                                      </div>
                                  </div>
                              ))
                          ) : (
                              <p className="no-data">No event data available yet.</p>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {activeTab === 'availability' && (
          <div className="availability-section">
              <h2>Manage Date Availability</h2>
              <p>Block dates when you cannot accept new bookings (holidays, fully booked, maintenance, etc.)</p>
              <AvailabilityCalendar />
          </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
          <BookingDetailsModal 
              booking={selectedBooking} 
              onClose={closeBookingModal}
              onUpdateStatus={handleStatusChange}
          />
      )}
    </div>
  );
};

export default AdminDashboard;