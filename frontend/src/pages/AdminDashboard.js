import React, { useState, useEffect, useMemo } from "react";
import { getAdminBookings, updateBookingStatus, getUnavailableDates, blockDate, unblockDate } from "../services/api";
import io from "socket.io-client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'

  useEffect(() => {
    fetchData();

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

  const fetchData = async () => {
    try {
      const [bookingsRes, availabilityRes] = await Promise.all([
          getAdminBookings(),
          getUnavailableDates()
      ]);
      setBookings(bookingsRes.data);
      setBlockedDates(availabilityRes.data.blockedDates);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch dashboard data");
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

  const handleDateClick = async (date) => {
      // Check if blocked
      const dateStr = date.toDateString();
      const isBlocked = blockedDates.some(d => new Date(d.date).toDateString() === dateStr);
      
      if (isBlocked) {
        if(window.confirm(`Unblock ${date.toLocaleDateString()}?`)) {
             try {
                 // We need to pass the ISO Date that was stored, or just the date object.
                 // The backend matches by date. Ideally convert to ISO string at midnight UTC or handle timezones carefully.
                 // For now, let's just find the exact ISO string from our state if possible or rely on date param.
                 const exactDate = blockedDates.find(d => new Date(d.date).toDateString() === dateStr).date;
                 await unblockDate(exactDate);
                 setBlockedDates(prev => prev.filter(d => new Date(d.date).toDateString() !== dateStr));
             } catch (e) {
                 alert("Failed to unblock date");
             }
        }
      } else {
        const reason = prompt(`Block ${date.toLocaleDateString()}? Enter reason (e.g. Fully Booked, Holiday):`);
        if (reason) {
            try {
                const res = await blockDate(date, reason);
                setBlockedDates(prev => [...prev, res.data]);
            } catch (e) {
                alert("Failed to block date: " + (e.response?.data?.message || e.message));
            }
        }
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

  const tileClassName = ({ date, view }) => {
      if (view === 'month') {
          if (blockedDates.some(d => new Date(d.date).toDateString() === date.toDateString())) {
              return 'calendar-tile-blocked';
          }
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
                  Availability Calendar
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
              <h2>Availability Management</h2>
              <p className="calendar-hint">Click a date to Block/Unblock it.</p>
              <Calendar 
                  tileContent={tileContent}
                  tileClassName={tileClassName}
                  onClickDay={handleDateClick}
                  value={new Date()}
              />
              <div className="calendar-legend">
                  <div className="legend-item"><span className="dot pending"></span> Pending Booking</div>
                  <div className="legend-item"><span className="dot confirmed"></span> Confirmed Booking</div>
                  <div className="legend-item"><span className="dot blocked"></span> Blocked/Holidays</div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;