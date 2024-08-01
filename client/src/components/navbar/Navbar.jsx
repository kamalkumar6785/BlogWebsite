import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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
  const handleClickCreate = ()=>{
    navigate('/create');
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" style={{color:'#ed1fce'}}>InkSight</a>
      </div>
      <div className="navbar-links">
        <a href="/?cat=technology">Technology</a>
        <a href="/?cat=science">Science</a>
        <a href="/?cat=art">Art</a>
        <a href="/?cat=finance">Finance</a>
        <a href="/?cat=health">Health</a>
        <a href="/?cat=gaming">Gaming</a>
        <a href="/?cat=news">News</a>
      </div>
      <div className="navbar-actions">
        {currentUser ? (
          <div className="navbar-user">
            <div style={{display:'flex',flexDirection:'row' ,alignItems:'center'}}>

           <span style={{marginRight:'5px'}}>{currentUser.username}</span>
            <img src={currentUser.profilepic || 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'} alt="Profile" className="profile-pic"  style={{height:'40px'}}/>
            </ div>
            <button onClick={handleClickCreate} className="create-button">
        <FontAwesomeIcon icon={faPencilAlt} /> Create
      </button>
            <button onClick={handleClickLogout} className="logout-button">
            Logout&nbsp; 
            <FontAwesomeIcon icon={faSignOutAlt} /> 
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
