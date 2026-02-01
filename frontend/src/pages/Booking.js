import React, { useState, useEffect } from "react";
import { createBooking, getUnavailableDates } from "../services/api";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Booking.css";

const eventTypes = [
  { name: "Wedding", icon: "💍" },
  { name: "Birthday Party", icon: "🎂" },
  { name: "Corporate Event", icon: "💼" },
  { name: "Engagement", icon: "💑" },
  { name: "Housewarming", icon: "🏡" },
  { name: "Festival Gathering", icon: "🎉" },
  { name: "Other", icon: "✨" },
];

const Booking = () => {
  const navigate = useNavigate();
  const [newBooking, setNewBooking] = useState({
    eventType: "",
    date: "",
    time: "",
    guests: "",
    venue: "",
    foodType: "",
    serviceType: "",
    contactPhone: "",
    additionalInfo: "",
  });
  const [blockedDates, setBlockedDates] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDates = async () => {
        try {
            const res = await getUnavailableDates();
            setBlockedDates(res.data.blockedDates);
        } catch (e) {
            console.error("Failed to fetch dates", e);
        }
    };
    fetchDates();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventTypeSelect = (type) => {
    setNewBooking((prev) => ({ ...prev, eventType: type }));
  };

  const handleDateChange = (date) => {
      // Offset for timezone issues, or just use YYYY-MM-DD string
      // Simplified: create a date object in local time and grab YYYY-MM-DD
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - (offset*60*1000));
      const dateString = localDate.toISOString().split('T')[0];
      setNewBooking((prev) => ({ ...prev, date: dateString }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBooking.eventType) {
        setError("Please select an event type.");
        return;
    }
    if (!newBooking.date) {
        setError("Please select a date.");
        return;
    }
    
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createBooking(newBooking);
      setSuccess("Booking submitted successfully! Check your email for confirmation.");
      setNewBooking({
        eventType: "",
        date: "",
        time: "",
        guests: "",
        venue: "",
        foodType: "",
        serviceType: "",
        contactPhone: "",
        additionalInfo: "",
      });
      // Optional: Redirect to dashboard after a delay
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("Failed to submit booking. " + (error.response?.data?.message || "Please try again."));
    } finally {
        setLoading(false);
    }
  };

  const tileDisabled = ({ date, view }) => {
      if (view === 'month') {
          // Disable past dates
          if (date < new Date(new Date().setHours(0,0,0,0))) return true;

          // Disable blocked dates
          return blockedDates.some(bg => new Date(bg.date).toDateString() === date.toDateString());
      }
      return false;
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="booking-header">
            <h1>Plan Your Special Event</h1>
            <p>Tell us about your occasion, and we'll take care of the food!</p>
        </div>

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        <form onSubmit={handleSubmit} className="booking-form-wizard">
            
            {/* Section 1: Event Type */}
            <div className="form-section">
                <label className="section-label">1. What's the occasion?</label>
                <div className="event-type-grid">
                    {eventTypes.map((event) => (
                        <div 
                            key={event.name} 
                            className={`event-type-card ${newBooking.eventType === event.name ? 'selected' : ''}`}
                            onClick={() => handleEventTypeSelect(event.name)}
                        >
                            <span className="event-icon">{event.icon}</span>
                            <span className="event-name">{event.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2: Date, Time & Venue */}
            <div className="form-section">
                <label className="section-label">2. When & Where?</label>
                <div className="form-row date-time-row">
                    <div className="input-group calendar-group">
                        <label>Select Date</label>
                        <Calendar
                            onChange={handleDateChange}
                            value={newBooking.date ? new Date(newBooking.date) : null}
                            tileDisabled={tileDisabled}
                            minDate={new Date()}
                            className="booking-calendar"
                        />
                        {newBooking.date && <p className="selected-date-hint">Selected: {new Date(newBooking.date).toLocaleDateString()}</p>}
                    </div>
                    <div className="side-inputs">
                        <div className="input-group time-group">
                            <label>Event Start Time</label>
                            <input 
                                type="time" 
                                name="time" 
                                value={newBooking.time} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label>Venue Address</label>
                            <textarea 
                                name="venue" 
                                value={newBooking.venue} 
                                onChange={handleInputChange} 
                                placeholder="Where is the party happening?"
                                required
                                rows="3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Guests & Menu Preferences */}
            <div className="form-section">
                <label className="section-label">3. Food & Guests</label>
                <div className="form-row">
                    <div className="input-group">
                        <label>Estimated Guests</label>
                        <input 
                            type="number" 
                            name="guests" 
                            value={newBooking.guests} 
                            onChange={handleInputChange} 
                            placeholder="e.g. 150"
                            min="1"
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Contact Number (For Event Day)</label>
                        <input 
                            type="tel" 
                            name="contactPhone" 
                            value={newBooking.contactPhone} 
                            onChange={handleInputChange} 
                            placeholder="+91 98765 43210"
                            required 
                        />
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="input-group">
                        <label>Preferred Cuisine</label>
                        <select name="foodType" value={newBooking.foodType} onChange={handleInputChange} required>
                            <option value="">Select Cuisine</option>
                            <option value="North Indian">North Indian</option>
                            <option value="South Indian">South Indian</option>
                            <option value="Pure Veg Standard">Pure Veg Standard</option>
                            <option value="Jain (No Onion/Garlic)">Jain (No Onion/Garlic)</option>
                            <option value="Continental">Continental</option>
                            <option value="Fusion">Fusion / Mix</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Service Style</label>
                        <select name="serviceType" value={newBooking.serviceType} onChange={handleInputChange} required>
                            <option value="">Select Service</option>
                            <option value="Buffet System">Buffet System</option>
                            <option value="Table Service (Sit-down)">Table Service (Sit-down)</option>
                            <option value="Traditional Leaf Service">Traditional Leaf Service</option>
                            <option value="Food Packets">Food Packets</option>
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <label>Additional Requests / Notes</label>
                    <textarea
                        name="additionalInfo"
                        value={newBooking.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any specific dishes, dietary restrictions, or special instructions?"
                        rows="3"
                    ></textarea>
                </div>
            </div>

            <button type="submit" className="submit-booking-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Book My Event'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
