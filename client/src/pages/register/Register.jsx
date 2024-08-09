import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/Register.css';
import { storage } from "../../Firebase"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    profilepic: ""
  });
  const baseUrl = 'http://localhost:4000/api';
  const [err, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInputs(prev => ({ ...prev, profilepic: e.target.files[0] }));
    setFileName(e.target.files[0]?.name || "");
  };

  const validate = () => {
    const errors = {};
    if (!inputs.username.trim()) {
      errors.username = "Username is required";
    }
    if (!inputs.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      errors.email = "Email address is invalid";
    }
    if (!inputs.password) {
      errors.password = "Password is required";
    } else if (inputs.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    if (inputs.profilepic) {
      const storageRef = ref(storage, `profile_pics/${inputs.profilepic.name}`);
      const uploadTask = uploadBytesResumable(storageRef, inputs.profilepic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error("Error uploading image:", error);
          setError("Error uploading image. Please try again.");
        },
        async () => {
          // Get the download URL
          const profilePicUrl = await getDownloadURL(uploadTask.snapshot.ref);
          registerUser(profilePicUrl);
        }
      );
    } else {
      registerUser('');
    }
  };

  const registerUser = async (profilePicUrl) => {
    try {
      await axios.post(`${baseUrl}/auth/register`, { ...inputs, profilepic: profilePicUrl });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="auth">
      <div className="home-icon" onClick={handleHomeClick}>
        <FontAwesomeIcon icon={faHome} />
      </div>
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        {validationErrors.username && <p className="error">{validationErrors.username}</p>}
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        {validationErrors.email && <p className="error">{validationErrors.email}</p>}
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        {validationErrors.password && <p className="error">{validationErrors.password}</p>}
        <div className="upload-section">
          <label htmlFor="file-upload" className="file-upload-label">
            <span className="upload-text">
              {fileName || "Upload Profile Picture"}
            </span>
            <input
              id="file-upload"
              type="file"
              name="profilepic"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <button onClick={handleSubmit}>Register</button>
        {err && <p className="error">{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
