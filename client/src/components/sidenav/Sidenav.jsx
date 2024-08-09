import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidenav.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const SideNav = ({ isOpen, toggleNav }) => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    toggleNav();
    navigate("/login");
  };

  const handleClickLogout = () => {
    toggleNav()
    logout();
  };
  
  const handleClickCreate = () => {
    toggleNav()
    navigate("/create");
  };

  const handleClickBookmark = () => {
    toggleNav()
    navigate("/bookmarks");
  };

  const handleClickMyBlogs = () => {
    toggleNav()
    navigate("/myblogs");
  };



  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button
        className="closebtn"
        style={{ fontSize: "30px",marginTop:'10px' }}
        onClick={toggleNav}
      >
        &times;
      </button>

      {currentUser ? (
        <div>
          <p  onClick={handleClickCreate}>
            Create
          </p>
          <p  onClick={handleClickBookmark}>
            Bookmarks
          </p>
          <p onClick={handleClickMyBlogs}>
            My Blogs
          </p>
          <p onClick={handleClickLogout}>Logout</p>
        </div>
      ) : (
        <p onClick={handleClickLogin}>Login</p>
      )}
    </div>
  );
};

export default SideNav;
