import React, { useState, useEffect } from "react"
import { createBooking, getUserBookings } from "../services/api"
import "../styles/Booking.css"

const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Engagement",
  "Housewarming",
  "Festival Gathering",
  "Other",
]

const Booking = () => {
  const [bookings, setBookings] = useState([])
  const [newBooking, setNewBooking] = useState({
    eventType: "",
    date: "",
    time: "",
    guests: "",
    additionalInfo: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await getUserBookings()
      setBookings(response.data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError("Failed to fetch bookings. Please try again.")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBooking((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      await createBooking(newBooking)
      setSuccess("Booking submitted successfully!")
      setNewBooking({
        eventType: "",
        date: "",
        time: "",
        guests: "",
        additionalInfo: "",
      })
      fetchBookings()
    } catch (error) {
      console.error("Error submitting booking:", error)
      setError("Failed to submit booking. Please try again.")
    }
  }

  return (
    <div className="booking-container">
      <h1>Make a Booking</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="eventType">Event Type</label>
          <select
            id="eventType"
            name="eventType"
            value={newBooking.eventType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={newBooking.date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input type="time" id="time" name="time" value={newBooking.time} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={newBooking.guests}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="additionalInfo">Additional Information</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={newBooking.additionalInfo}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Booking
        </button>
      </form>

<<<<<<< HEAD
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

            {/* Section 2: Date & Time */}
            <div className="form-section">
                <label className="section-label">2. When becomes the memory?</label>
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
                    <div className="input-group time-group">
                        <label>Time</label>
                        <input 
                            type="time" 
                            name="time" 
                            value={newBooking.time} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                </div>
            </div>

            {/* Section 3: Guests & Details */}
            <div className="form-section">
                <label className="section-label">3. The finer details</label>
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
                    <label>Additional Requests (Optional)</label>
                    <textarea
                        name="additionalInfo"
                        value={newBooking.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any dietary restrictions, special menu items, or location details?"
                        rows="4"
                    ></textarea>
                </div>
            </div>

            <button type="submit" className="submit-booking-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Book My Event'}
            </button>
        </form>
      </div>
=======
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <p>
                <strong>Event Type:</strong> {booking.eventType}
              </p>
              <p>
                <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guests}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
>>>>>>> parent of 13fb6a3 (Merge pull request #5 from SammedBG/master)
    </div>
  )
}

export default Booking
