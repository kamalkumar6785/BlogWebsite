import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/login'); 
  };

  const handleClickLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">My Blog</a>
      </div>
      <div className="navbar-links">
        <a href="/?cat=technology">Technology</a>
        <a href="/?cat=science">Science</a>
        <a href="/?cat=art">Art</a>
        <a href="/?cat=food">Food</a>
        <a href="/?cat=finance">Finance</a>
        <a href="/?cat=health">Health</a>
      </div>
      <div className="navbar-actions">
        {currentUser ? (
          <div className="navbar-user">
            <img src={currentUser.profilepic} alt="Profile" className="profile-pic"  style={{height:'50px'}}/>
            <button onClick={handleClickLogout} className="create-button">
              Create
            </button>
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
