import React from 'react';
import '../styles/BookingDetailsModal.css';

const BookingDetailsModal = ({ booking, onClose, onUpdateStatus }) => {
    if (!booking) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed': return 'status-badge confirmed';
            case 'cancelled': return 'status-badge cancelled';
            default: return 'status-badge pending';
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="booking-modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Booking Details</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="detail-section">
                        <h3>Event Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Event Type</label>
                                <p>{booking.eventType}</p>
                            </div>
                            <div className="detail-item">
                                <label>Date</label>
                                <p>{formatDate(booking.date)}</p>
                            </div>
                            <div className="detail-item">
                                <label>Time</label>
                                <p>{booking.time}</p>
                            </div>
                            <div className="detail-item">
                                <label>Guests</label>
                                <p>{booking.guests} People</p>
                            </div>
                            <div className="detail-item full-width">
                                <label>Additional Info</label>
                                <p>{booking.additionalInfo || 'None provided'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Customer Information</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>Name</label>
                                <p>{booking.user?.name || 'Unknown'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Email</label>
                                <p>{booking.user?.email || 'Unknown'}</p>
                            </div>
                            <div className="detail-item">
                                <label>Booking ID</label>
                                <p className="mono">{booking._id}</p>
                            </div>
                            <div className="detail-item">
                                <label>Created At</label>
                                <p>{new Date(booking.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="current-status">
                         <span className={getStatusClass(booking.status)}>
                            Current Status: {booking.status.toUpperCase()}
                        </span>
                    </div>
                    <div className="action-buttons">
                        {booking.status === 'pending' && (
                            <>
                                <button 
                                    className="action-btn confirm"
                                    onClick={() => onUpdateStatus(booking._id, 'confirmed')}
                                >
                                    Confirm Booking
                                </button>
                                <button 
                                    className="action-btn cancel"
                                    onClick={() => onUpdateStatus(booking._id, 'cancelled')}
                                >
                                    Cancel Request
                                </button>
                            </>
                        )}
                         {booking.status === 'confirmed' && (
                            <button 
                                className="action-btn cancel"
                                onClick={() => onUpdateStatus(booking._id, 'cancelled')}
                            >
                                Cancel Booking
                            </button>
                        )}
                        <button className="action-btn close-modal-btn" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsModal;
