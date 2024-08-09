import React, { useContext,useState } from 'react';
import './Navbar.css';
import logo from '../../asset/pen-tool.png';  
import SideNav from '../sidenav/Sidenav';
import Hamburger from '../hamburger/Hamburger';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} style={{height:'20px' }} alt="" />
        <a href="/" style={{color:'#ed1fce'}}>InkSight</a>
      </div>
      <div className="navbar-links">
        <a href="/?cat=entertainment">Entertainment</a>
        <a href="/?cat=science">Science</a>
        <a href="/?cat=art">Art</a>
        <a href="/?cat=finance">Finance</a>
        <a href="/?cat=health">Health</a>
        <a href="/?cat=gaming">Gaming</a>
        <a href="/?cat=news">News</a>
      </div>
      <div className="navbar-actions">

        {currentUser?
               <div className="navbar-user">
               <div style={{display:'flex',flexDirection:'row' ,alignItems:'center'}}>
   
              <span style={{marginRight:'5px'}}>{currentUser.username}</span>
               <img src={currentUser.profilepic  || 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'} alt="Profile" className="profile-pic"  style={{height:'40px'}}/>
               </ div>
   
   
             </div>:
             
             <div></div>
   
      }
          <Hamburger toggleNav={toggleNav} />
          <SideNav isOpen={isNavOpen} toggleNav={toggleNav} />
        
      </div>
    </nav>
  );
};

export default Navbar;
