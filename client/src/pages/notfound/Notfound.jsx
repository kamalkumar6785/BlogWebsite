import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import './Notfound.css'; // Create a CSS file for styling if needed

const NotFound = (props) => {
  const navigate = useNavigate();


  if(props.blog)
  {
    return ( 
        <div className="not-found">
        <h1>404 Not Found</h1>
        <p>The Blog you are looking for does not exist</p>
        
      </div>    
      )
  }
  return (
    <div className="not-found">
      <h1>404 - Page Not Found {props.blog}</h1>
      <p>The page you are looking for does not exist.</p>
      
    </div>
  );
};

export default NotFound;
