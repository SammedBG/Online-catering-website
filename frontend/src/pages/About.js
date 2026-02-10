import React,{ useEffect, useState } from 'react';
import '../styles/About.css';
import { getReviews } from "../services/api";
import { Link } from 'react-router-dom';
import NewButton from '../components/NewButton';
import cardimage3 from '../assets/images/cooking.avif';
import cd1 from '../assets/images/card-5.jpg';
import cd2 from '../assets/images/card-6.jpg';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';

const About = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await getReviews();
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error.response?.status, error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div className="about-container">
      <div className="about-section-main">
        <div className="about-section-1">
          <h2>About Us</h2>
        </div>
      </div>
     <div className="tagline-head">
     <div className="tagline">
        <h1>❛❛Pure Veg Delights That Reach Beyond the Event❜❜</h1>
        <p>Our catering service is dedicated to creating memorable dining experiences with a wide range of delicious and wholesome pure vegetarian dishes. We take pride in serving fresh, high-quality meals crafted with love and care for every occasion from weddings and parties to corporate events and religious gatherings.
        </p>
        <p>But our commitment doesn't stop there. We believe food is a gift that should never go to waste. That's why we go the extra mile by distributing leftover food to those in need, spreading joy and nourishment beyond the event itself. This thoughtful gesture allows your celebration to create a lasting, positive impact in the community.</p>
      </div>
     </div>
      <div className="section-2">
        <div className="image-home">
          <img src={cd1} alt="card-1" />
          <img src={cd2} alt="card-2" />
        </div>
        <div className="home-section-1 about-section-h2">
          <h6>ABOUT US</h6>
          <h2 >Indulge in a
            celebration with great
            food!</h2>
          <h4>Mahaveer Catering Service, established in 2015, is dedicated to creating memorable dining experiences with nearly two decades of expertise. We specialize in crafting delicious, high-quality meals using fresh ingredients, and pay close attention to detail  from presentation to hygiene standards. Whether it's a wedding, corporate event, or family gathering, our team ensures every event is thoughtfully planned and perfectly executed, leaving a lasting impression on your guests. Let Mahaveer Catering bring your vision to life and make your occasion truly special.</h4>
          <Link to="/booking" className="about-btn"><NewButton text="Book Now" /></Link>
        </div>
      </div>
      <div className="about-section-2">
        <div className="about-content-1">
          <h2>
            A Quality-Driven
            Catering Company
          </h2>
          <p>We have been one of the successful names in the business when it comes to providing catering and services. Our team has completed all the events on large and medium scales just the way it has been asked by the client. Whether you need service indoors or outdoors, we can take care of it just the way you want</p>
          <Link to="/menu" className=""><NewButton text="Our Menu" /></Link>
        </div>
        <div className="about-img">
          <img src={cardimage3} alt="about_imags" />
        </div>
      </div>
      <div className="review-section">
        <ReviewForm fetchReviews={fetchReviews} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};





export default About;