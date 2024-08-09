import React from 'react';
import './Hamburger.css';
import menu from '../.././asset/hamburger.png'

const Hamburger = ({ toggleNav }) => {
  return (
    <div style={{marginLeft:'10px'}} className="hamburger" onClick={toggleNav}>
        <img src={menu}  />
    </div>
  );
};

export default Hamburger;
