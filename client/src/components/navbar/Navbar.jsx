// src/Navbar.js
import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);




  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">My Blog</a>
     
      </div>
          {currentUser ? (
            
            <span onClick={logout}>{currentUser.username+" "} Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
      
    </nav>
  );
};

export default Navbar;
