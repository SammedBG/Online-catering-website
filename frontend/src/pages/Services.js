import React from "react";
import '../styles/Services.css';
import event1 from '../assets/images/engagement.jpg';
import event2 from '../assets/images/housewarming.jpg';
import event7 from '../assets/images/naming.jpg';
import event11 from '../assets/images/wedding.jpg';
import event12 from '../assets/images/birthday.webp';
import event13 from '../assets/images/carporate.jpg';

function Services() {
    return (
        <div className="service-section">
            <div className="about-section-main">
                <div className="about-section-1">
                    <h2>Services</h2>
                </div>
            </div>
            <div className="service-section-1">
                <div className="home-section-3">
                    <h6>WHAT WE DO</h6>
                    <h2 className='home-section-h2'>Standard Catering Services</h2>
                    <div className="section-card-block">
                        <div className="section-card-3">
                            <img src={event1} alt="card-1" />
                            <h4>Engagement</h4>
                            <ul>
                                <li>We serve 50 to 1000+ guests for a perfect engagement.</li>

                                <li>Our menu offers traditional, gourmet, and custom vegetarian dishes.</li>

                                <li>Fresh, high-quality ingredients ensure top hygiene standards.</li>

                                <li>Buffets, plated meals, desserts, and live stations available.</li>

                                <li>Our staff provides smooth, courteous, and professional service.</li>

                                <li>Elegant decor and stylish food presentation enhance the event.</li>
                            </ul>
                        </div>
                        <div className="section-card-3">
                            <img src={event2} alt="House Warming Event" loading='lazy' />
                            <h4>House Warming</h4>
                                <ul>
                                    <li>We handle 50 to 1000+ guests for a seamless celebration.</li><li>Our menu offers traditional, festive, and custom vegetarian dishes.</li>

                                    <li>We ensure top hygiene with fresh, high-quality ingredients.</li>

                                    <li>Buffets, plated meals, snacks, sweets, and live counters available.</li>

                                    <li>Our staff provides smooth, friendly, and efficient service.</li>

                                    <li>Elegant setups enhance the warmth of your home event.</li>
                                </ul> 
                        </div>

                    </div>
                    <div className="section-card-block">
                    </div>
                    <div className="section-card-block">
                        <div className="section-card-3">
                            <img src={event7} alt="Naming Ceremony" loading='lazy' />
                            <h4>Naming Ceremony</h4>
                            <ul>
                                <li>We manage 50 to 1000+ guests, ensuring a heartfelt naming ceremony.</li>

                                <li>Our menu features traditional, festive, and personalized delicacies.</li>

                                <li>We maintain top hygiene standards with fresh, high-quality ingredients.</li>

                                <li>We serve buffets, sit-down meals, sweets, and interactive food stations.</li>

                                <li>Our dedicated staff ensures smooth, polite, and welcoming service.</li>

                                <li>Graceful presentation and decorative arrangements elevate the celebration.</li>
                            </ul>
                        </div>
                        <div className="section-card-3">
                            <img src={event11} alt="Wedding Event" />
                            <h4>Wedding Event</h4>
                            <ul>
                                <li>We cater to 100 to 3000+ guests for a grand wedding.</li>
                                <li>We ensure strict hygiene with fresh ingredients and sanitized kitchens.</li>
                                <li>Our pure vegetarian menu includes Jain, Satvik, and custom options.</li>
                                <li>We offer Indian, International cuisines, live counters, and desserts.</li>
                                <li>Our trained staff provides seamless buffet, plated meals, and live cooking.</li>
                                <li>Elegant food presentation and décor enhance the wedding ambiance.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="section-card-block">
                        
                        <div className="section-card-3">
                            <img src={event12} alt="Birthday Party" loading='lazy' />
                            <h4>Birthday Party</h4>
                            <ul>
                                <li>We handle 50 to 1000+ guests, ensuring a joyful birthday party.</li>

                                <li>Our diverse menu includes kid-friendly, healthy, and special treats.</li>

                                <li>We follow strict hygiene practices, using fresh and quality ingredients.</li>

                                <li>We provide buffets, live food stations, desserts, and fun snacks.</li>

                                <li>Our courteous staff ensures smooth, quick, and friendly service.</li>

                                <li>Vibrant presentation and themed setups create a lively atmosphere.</li>
                            </ul>
                        </div>
                        <div className="section-card-3">
                            <img src={event13} alt="Corporate Event" />
                            <h4>Corporate Event</h4>
                            <ul>
                                <li>We serve 50 to 2000+ guests, ensuring a seamless corporate event.</li>

                                <li>Our custom menus suit meetings, seminars, and business gatherings.</li>

                                <li>We maintain high hygiene standards with fresh, quality ingredients.</li>

                                <li>We offer buffets, plated meals, and live food stations.</li>

                                <li>Our expert staff ensures fast, professional, and courteous service.</li>

                                <li>Elegant presentation and decor enhance the corporate ambiance.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}



export default Services;