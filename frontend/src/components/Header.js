

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="container nav-menu">
        <Link to="/" className="logo"><img src="/images/logo1.png" alt="logo" /></Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={isMenuOpen ? 'show' : ''}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          <li><Link to="/gallary" onClick={toggleMenu}>Gallary</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
          <li><Link to="/menu" onClick={toggleMenu}>Menu</Link></li>
          <li><Link to="/location" onClick={toggleMenu}>Contact Us</Link></li>
          <li><Link to="/booking" onClick={toggleMenu}>Booking</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/admin" onClick={toggleMenu}>Admin Dashboard</Link></li>
              )}
              <li>
                <button className='log-out' onClick={() => { logout(); toggleMenu(); }}>logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login" onClick={toggleMenu}><i className="fa-duotone fa-solid fa-right-to-bracket"></i></Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

