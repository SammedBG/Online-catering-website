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
    </div>
  )
}

export default Booking
