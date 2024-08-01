import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/login'); 
  };

  const handleClickLogout = () => {
    navigate('/logout'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">My Blog</a>
      </div>
      <div className="navbar-links">
        <a href="/category/technology">Technology</a>
        <a href="/category/science">Science</a>
        <a href="/category/art">Art</a>
        <a href="/category/food">Food</a>
      </div>
      <div className="navbar-actions">
        {currentUser ? (
          <div className="navbar-user">
            <img src={currentUser.profilepic} alt="Profile" className="profile-pic"  style={{height:'50px'}}/>
            <button onClick={handleClickLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleClickLogin} className="login-button">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
