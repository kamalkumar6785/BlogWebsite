import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/Register.css';
import { storage } from "../../Firebase"; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    profilepic: ""
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInputs(prev => ({ ...prev, profilepic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    console.log(profilePicUrl);
    try {
      await axios.post("/auth/register", { ...inputs, profilepic: profilePicUrl });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="file"
          name="profilepic"
          placeholder="choose profile pic"
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{'Error Registering User !!'}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
