import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Notauthenticated.css'

const NotAuthenticated = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="not-authenticated">
      <h1>Access Denied</h1>
      <p>You are not authenticated to view this page.</p>
      <button onClick={handleLoginRedirect} className="login-redirect-button">
        Go to Login
      </button>
    </div>
  );
};

export default NotAuthenticated;
