import React, { useState, useEffect, useMemo } from "react";
import { getAdminBookings, updateBookingStatus } from "../services/api";
import io from "socket.io-client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'

  useEffect(() => {
    fetchBookings();

    const socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000");

    socket.on("newBooking", (newBooking) => {
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
      setError("Failed to fetch bookings");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(prev => prev.map(b => b._id === bookingId ? {...b, status: newStatus} : b));
    } catch (error) {
      setError("Failed to update status");
    }
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
    return {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        guests: bookings.reduce((acc, curr) => acc + (parseInt(curr.guests) || 0), 0)
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
    </div>
  );
};

export default AdminDashboard;