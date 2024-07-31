// src/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">My Blog</a>
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><a href="/signin">Sign In</a></li>
        <li><a href="/subscribe">Subscribe</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
