import React from 'react';
import '../styles/Footer.css';

const Footer = () => {

  return (

    <footer className="footer">
      <div className="marquee-banner">
        <div className="marquee-content">
          <span>Birthday</span>•
          <span>House warming</span>•
          <span>Mehndi</span>•
          <span>Corporate</span>•
          <span>Retirement</span>•
          <span>Wedding</span>•
          <span>Anniversary</span>•
          <span>Engagement</span>
        </div>
        <div className="marquee-content">
          •<span>Birthday</span>•
          <span>House warming</span>•
          <span>Mehndi</span>•
          <span>Corporate</span>•
          <span>Retirement</span>•
          <span>Wedding</span>•
          <span>Anniversary</span>•
          <span>Engagement</span>
        </div>
        <div className="marquee-content">
          •<span>Birthday</span>•
          <span>House warming</span>•
          <span>Mehndi</span>•
          <span>Corporate</span>•
          <span>Retirement</span>•
          <span>Wedding</span>•
          <span>Anniversary</span>•
          <span>Engagement</span>
        </div>
      </div>
      <div className="container-footer">
        <div className="footer-content-3">
          <div className="logo-f">
            <img className=' logo-ff' src="/images/logo1.png" alt="logo" />
          </div>
          <div className="para-1">
            <p>Let Mahaveer Catering transform your special occasion into a masterpiece with our professional touch.</p>
          </div>
          <div className="icons-f">
            <a href="https://wa.me/9739676924 "><i class="fa-brands fa-whatsapp "></i></a>
            <a href="/"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="/"><i class="fa-brands fa-instagram"></i></a>
            <a href="/"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
        <div className="address">
          <h3>Contact Now</h3>
          <div className="para-2">
            <i class="fa-solid fa-location-dot"></i><p>No:389/B Patil Galli Halaga,Belagavi,karnataka-590020 </p>
          </div>
          <div className="para-2">
            <i class="fa-solid fa-phone"></i><p>Phone: +91 9742728429</p>
          </div>
          <div className="para-2">
            <i class="fa-regular fa-envelope"></i><p><a href="/">Email:sachininchal914@gmail.com</a></p>
          </div>

        </div>
      </div>
      <div className="footer-line">
        <p>&copy; {new Date().getFullYear()} <b>Shree Mahaveer Inchal Catering.</b>  All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;

