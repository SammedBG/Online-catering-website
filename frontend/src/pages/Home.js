import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import cardImage from '../assets/images/card-2.jpg';
import cardImage2 from '../assets/images/card-1.avif';
import png from '../assets/images/badge.png';
import png2 from '../assets/images/png2.png';
import png3 from '../assets/images/png3.png';
import png4 from '../assets/images/png4.png';
import event1 from '../assets/images/wedding.jpg';
import event3 from '../assets/images/carporate.jpg';
import NewButton from '../components/NewButton';


const Home = () => {
  return (
    <div className="home">
      <div className="home-section-main">
        <div className="section-1">
          <h1 className='hello'>Welcome to Shree Mahaveer Inchal Catering Service</h1>
          <h4 className='h4-tag'>❛❛Pure Veg Delights That Reach Beyond the Event❜❜</h4>
          <div className="explore-1 ">
            <Link to="/about" className='ex' >Explore</Link>
            <Link to="/location" className='ex'>Contact Us</Link>
          </div>
        </div>
      </div>
      <div className="section-2">
        <div className="image-home">
          <img src={cardImage} alt="card-1" />
          <img src={cardImage2} alt="card-2" />
        </div>
        <div className="home-section-1">
          <h6>ABOUT US</h6>

          <h2>Elevating Your
            Events with
            Exceptional Food.</h2>
          <h4>Mahaveer Catering is The Place where Food is Celebrated over 10 Years. We Love to Create Unforgettable Culinary Experiences.
            Mahaveer Catering Service is the leading vegetarian caterer in Karnataka, with 10 years of experience and over 1,000 successful weddings. Supported by a dedicated team of 740 professionals, we specialize in crafting high-quality, flavorful meals using fresh ingredients. With a focus on excellence, attention to detail, and 98% repeat customers, we ensure every event is unique, memorable, and perfectly executed. Let us make your special day unforgettable.</h4>
          <Link to="/about" className="about-btn"><NewButton text="About Us" /></Link>
        </div>
      </div>
      <div className="home-section-3">
        <h6>WHAT WE DO</h6>
        <h2 className='home-section-h2'>Standard Catering Services</h2>
        <div className="section-card-block">
          <div className="section-card-3">
            <img src={event1} alt="card-1" />
            <h4>Wedding Event</h4>
            <p><ul>
                                <li>We cater to 100 to 3000+ guests for a grand wedding.</li>
                                <li>We ensure strict hygiene with fresh ingredients and sanitized kitchens.</li>
                                <li>Our pure vegetarian menu includes Jain, Satvik, and custom options.</li>
                                <li>We offer Indian, International cuisines, live counters, and desserts.</li>
                                <li>Our trained staff provides seamless buffet, plated meals, and live cooking.</li>
                                <li>Elegant food presentation and décor enhance the wedding ambiance.</li>
                            </ul></p>
          </div>
          <div className="section-card-3">
            <img src={event3} alt="card-3" />
            <h4>Corporate Event</h4>
            <p><ul>
                                <li>We serve 50 to 2000+ guests, ensuring a seamless corporate event.</li>

                                <li>Our custom menus suit meetings, seminars, and business gatherings.</li>

                                <li>We maintain high hygiene standards with fresh, quality ingredients.</li>

                                <li>We offer buffets, plated meals, and live food stations.</li>

                                <li>Our expert staff ensures fast, professional, and courteous service.</li>

                                <li>Elegant presentation and decor enhance the corporate ambiance.</li>
                            </ul></p>
          </div>
        </div>
        <div className="btn-home">
          <Link to="/services" className=""><NewButton text="Services" /></Link>
        </div>
      </div>
      <div className="home-content">

        <div className="home-section about-section">

          <div>
            <h4>WHY CHOOSE US</h4>
            <h2 className='home-header'>Leave Your Guests
              Speechless With Our
              Fabulous Food!</h2>
          </div>
          <div className='icon-p'>
            <div className="icon-text">
              <img src={png} alt="icon-1" />
              <h4>Best Quality
              </h4>
              <p>Top quality standards, excellence in every bite.
              </p>
            </div>
            <div className="icon-text">
              <img src={png2} alt="icon-2" />
              <h4>Service Excellence
              </h4>
              <p>Outstanding service and unforgettable experiences..</p>
            </div>
            <div className="icon-text">
              <img src={png3} alt="icon-3" />
              <h4>Authentic Taste
              </h4>
              <p>Enjoy our traditional recipes, inspired by rich culinary heritage.</p>
            </div>
            <div className="icon-text">
              <img src={png4} alt="icon-4" />
              <h4>Heritage
              </h4>
              <p>Mahaveer caterings blends food and heart, rooted in family traditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

