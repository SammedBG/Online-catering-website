import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Location.css';
import NewButton from '../components/NewButton'

const Location = () => {
  return (
    <div className="location-container">
      <div className="about-section-main">
        <div className="about-section-1">
          <h2>Contact Us</h2>
        </div>
      </div>
      <div className="contact-section">
        <h4 className='h4-info'>HELLO EVERYONE</h4>
        <h2 className='h2-info'>We prepare food just like your home in large
          quantities. Thats it. Do book us and relax.</h2>
        <p>We offer personalized catering solutions for all events, ensuring every detail is perfect. Contact us for exceptional service and exquisite culinary experiences tailored to your needs.Your satisfaction is our top priority.</p>
        <Link to="/booking" className='contact-btn'><NewButton text="Book Now" /></Link>
      </div>
      <div className="location-main">
        <h4>CONTACT US</h4>
        <h2 className='h2-get'>Get In Touch</h2>
        <div className="location-content">
          <div className="location-info">
            <h2>Address</h2>
            <div className="location-icon">
              <i class="fa-solid fa-location-dot"></i><span>No:389/B Patil Galli Halaga,Belagavi,karnataka-590020 </span>
            </div>
            <h2>Contact</h2>
            <a className='w-me' href="https://wa.me/9742728429 ">Whatsapp Now</a>
            <div className="location-icon">
              <i class="fa-solid fa-phone"></i><span>Phone: +91 9742728429</span>
            </div>
            <div className="location-icon">
            <i class="fa-regular fa-envelope"></i>
            <span>Email:sachininchal914@gmail.com</span>
            </div>
          </div>
          <div className="location-map">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d239.9159935861353!2d74.56127217403463!3d15.822087980465257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736796252646!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location For Shree Mahaveer Inchal Catering"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

