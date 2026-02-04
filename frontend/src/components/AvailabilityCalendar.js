import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getAdminBlockedDates, blockDate, unblockDate } from '../services/api';
import 'react-calendar/dist/Calendar.css';
import '../styles/AvailabilityCalendar.css';

const AvailabilityCalendar = () => {
    const [blockedDates, setBlockedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('Fully Booked');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBlockedDates();
    }, []);

    const fetchBlockedDates = async () => {
        try {
            const response = await getAdminBlockedDates();
            setBlockedDates(response.data);
        } catch (error) {
            console.error('Error fetching blocked dates:', error);
        }
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const blocked = blockedDates.find(bd => 
            new Date(bd.date).toDateString() === date.toDateString()
        );
        
        if (blocked) {
            // If date is blocked, ask to unblock
            if (window.confirm(`This date is blocked (${blocked.reason}). Would you like to unblock it?`)) {
                handleUnblock(blocked._id);
            }
        } else {
            // Show modal to block date
            setShowModal(true);
            setReason('Fully Booked');
            setNote('');
        }
    };

    const handleBlock = async () => {
        if (!selectedDate) return;
        
        setLoading(true);
        try {
            const dateData = {
                date: selectedDate.toISOString(),
                reason,
                note
            };
            const response = await blockDate(dateData);
            setBlockedDates(prev => [...prev, response.data]);
            setShowModal(false);
            setSelectedDate(null);
        } catch (error) {
            console.error('Error blocking date:', error);
            alert(error.response?.data?.message || 'Failed to block date');
        } finally {
            setLoading(false);
        }
    };

    const handleUnblock = async (id) => {
        try {
            await unblockDate(id);
            setBlockedDates(prev => prev.filter(bd => bd._id !== id));
        } catch (error) {
            console.error('Error unblocking date:', error);
            alert('Failed to unblock date');
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const isBlocked = blockedDates.some(bd => 
                new Date(bd.date).toDateString() === date.toDateString()
            );
            return isBlocked ? 'blocked-date' : null;
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const blocked = blockedDates.find(bd =>
                new Date(bd.date).toDateString() === date.toDateString()
            );
            if (blocked) {
                return <div className="blocked-indicator">🚫</div>;
            }
        }
    };

    return (
        <div className="availability-calendar-container">
            <div className="calendar-section">
                <h3>Click on a date to block/unblock</h3>
                <Calendar
                    onClickDay={handleDateClick}
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                    minDate={new Date()}
                />
            </div>

            <div className="blocked-dates-list">
                <h3>Blocked Dates ({blockedDates.length})</h3>
                {blockedDates.length > 0 ? (
                    <ul>
                        {blockedDates.sort((a, b) => new Date(a.date) - new Date(b.date)).map(bd => (
                            <li key={bd._id} className="blocked-date-item">
                                <div className="date-info">
                                    <strong>{new Date(bd.date).toLocaleDateString('en-IN', { 
                                        day: 'numeric', 
                                        month: 'short', 
                                        year: 'numeric' 
                                    })}</strong>
                                    <span className={`reason-badge ${bd.reason.toLowerCase().replace(' ', '-')}`}>
                                        {bd.reason}
                                    </span>
                                </div>
                                {bd.note && <p className="note">{bd.note}</p>}
                                <button 
                                    onClick={() => handleUnblock(bd._id)}
                                    className="unblock-btn"
                                >
                                    Unblock
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-message">No blocked dates. Click on the calendar to block dates.</p>
                )}
            </div>

            {/* Modal for blocking a date */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Block Date: {selectedDate?.toLocaleDateString()}</h3>
                        <div className="form-group">
                            <label>Reason</label>
                            <select value={reason} onChange={(e) => setReason(e.target.value)}>
                                <option value="Fully Booked">Fully Booked</option>
                                <option value="Holiday">Holiday</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Note (Optional)</label>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Add additional details..."
                            />
                        </div>
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)} className="cancel-btn-modal">
                                Cancel
                            </button>
                            <button onClick={handleBlock} disabled={loading} className="block-btn-modal">
                                {loading ? 'Blocking...' : 'Block Date'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailabilityCalendar;
