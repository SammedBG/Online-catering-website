import React from 'react';
import '../styles/Menu.css';
import starter1 from '../assets/images/starter1.jpg'
import starter2 from '../assets/images/roti.jpg'
import starter3 from '../assets/images/dosa.jpg'
import starter4 from '../assets/images/Dal.jpg'
import starter6 from '../assets/images/raitha1.jpg'
import starter7 from '../assets/images/Coconut_Chutney.jpg'
import starter9 from '../assets/images/gobi.avif'
import starter5 from '../assets/images/image.png'
import pdfFile1 from "../assets/pdf/Wedding_Menu.pdf";
import pdfFile2 from "../assets/pdf/Corporate_event.pdf";
import pdfFile3 from "../assets/pdf/family_parties.pdf";

function Menu() {

  return (
    <div className="menu-Section">
      <div className="about-section-main">
        <div className="about-section-1">
          <h2>Menu</h2>
        </div>
      </div>
      <div className="custmized-menu">
        <h1>Customize Your Menu for a Memorable Event!</h1>
        <h6>Make your event truly special by customizing your own menu from our diverse selection of dishes pricing is tailored to your choices. If you have a specific dish in mind that isn’t on our list, just let us know! We’ll do our best to include it and ensure a delightful dining experience that perfectly suits your taste and preferences</h6>
      </div>
      <div className="pdf-down">
        <div className="wedding">
        <h1><u>Wedding Event</u></h1>
        <a href={pdfFile1} download="wedding menu"><i class="fa-solid fa-file-pdf"></i></a>
        </div>
        <div className="wedding">
        <h1><u>Corporate Event </u></h1>
        <a href={pdfFile2} download="corporate event menu"><i class="fa-solid fa-file-pdf"></i></a>
        </div>
        <div className="wedding">
        <h1><u>Family Party </u></h1>
        <a href={pdfFile3} download="Family party menu"><i class="fa-solid fa-file-pdf"></i></a>
        </div>
      </div>
      <div className="menu-section-2">
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter1} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>STARTER</h2>
            <ul>
              <li>Finger Chips</li>
              <li>Masala Papad</li>
              <li>Onion Pakoda</li>
              <li>Palak Pakoda</li>
              <li>Panner Hot Fry</li>
              <li>Corn Chat</li>
              <li>Chana Chat</li>
              <li>Shenga Chat</li>
              <li>Khaman Dhokla</li>
              <li>Chote Kachori</li>
            </ul>
          </div>
        </div>
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter2} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>ROTI</h2>
            <ul>
              <li>Tawa/Palak Paratha</li>
              <li>Methi/Alu Paratha</li>
              <li>Chapati</li>
              <li>Methi/Masala Chapati</li>
              <li>Puri/Methi Puri</li>
              <li>Palak/Masala Puri</li>
              <li>Tandoori Roti</li>
              <li>Kulcha</li>
              <li>Naan</li>
              <li>Butter Naan</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="menu-section-2">
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter4} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>DAL</h2>
            <ul>
              <li>Dal Fry</li>
              <li>Dal Tadka</li>
              <li>Dal Makni</li>
              <li>Dal Kolhapuri</li>
              <li>Veg Curry</li>
              <li>Butter Dal Fry</li>
              <li>Sambar</li>
              <li>Varan</li>
              <li>Saar</li>
              <li>Rasam</li>
            </ul>
          </div>
        </div>
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter5} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>SPECIAL VEG KHAJANA</h2>
            <ul>
              <li>Veg Kadai</li>
              <li>Veg Kolhapuri</li>
              <li>Veg Hydrabadi</li>
              <li>Veg Maharaj</li>
              <li>Kaju Mutter Paneer</li>
              <li>Paneer Tikka Masala</li>
              <li>Paneer Butter Masala</li>
              <li>Palak Paneer </li>
              <li>Paneer Kadai</li>
              <li>Paneer Mashroom Masala</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="menu-section-2">
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter6} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>RAITHA</h2>
            <ul>
              <li>Kakadi Raitha</li>
              <li>Moogdal Raitha</li>
              <li>Pineapple Raitha</li>
              <li>Boondi Raitha</li>
              <li>Mix Raitha</li>
              <li>Gajar Koshimbir</li>
              <li>Spring Onion Raitha</li>
              <li>Mix Fruit Raitha</li>
              <li>Onion Tomato Raitha</li>
              <li>Tomato Koshimbir</li>
            </ul>
          </div>
        </div>
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter7} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>CHUTNEY'S</h2>
            <ul>
              <li>Shenga Chutney</li>
              <li>Putani Chutney</li>
              <li>Guralla Chutney</li>
              <li>Coconut Chutney Dry</li>
              <li>Cocunut Chutney Wet</li>
              <li>Pudina Chutney</li>
              <li>Tomato Chutney</li>
              <li>Green Chutney</li>
              <li>Mango Chutney</li>
              <li>Biryani Chutney</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="menu-section-2">
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter9} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>CHINESE STARTER</h2>
            <ul>
              <li>Veg Manchurian/65</li>
              <li>Gobi Manchurian</li>
              <li>Potato Crispy</li>
              <li>Paneer Chilly</li>
              <li>Baby Corn Chilly</li>
              <li>Veg Sandwich</li>
              <li>Dahi Sandwich</li>
              <li>Veg Spring Roll</li>
              <li>Methi Kabab</li>
              <li>Mushroom Manchurian</li>
            </ul>
          </div>
        </div>
        <div className="menu-cards">
          <div className="menu-image">
            <img src={starter3} alt="menu-image" />
          </div>
          <div className="menu-content">
            <h2>SOUTH INDIAN DISH</h2>
            <ul>
              <li>Idli</li>
              <li>Masala Dosa</li>
              <li>Vada</li>
              <li>Uppit</li>
              <li>Puri</li>
              <li>Poha</li>
              <li>Paper Dosa</li>
              <li>Set Dosa</li>
              <li>Uttappa</li>
              <li>Pav Bhaji</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Menu;

