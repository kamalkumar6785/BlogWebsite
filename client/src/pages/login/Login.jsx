import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/Login.css'; // Reusing the same CSS as Register
import { AuthContext } from "../../context/authContext";


const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:4000/api';


  
  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
