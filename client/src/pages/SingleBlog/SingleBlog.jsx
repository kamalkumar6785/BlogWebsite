import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../../components/menu/Menu";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import '../../styles/Single.css';

const SingleBlog = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const baseUrl = 'http://localhost:4000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/blog/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/blog/${postId}`, {
        withCredentials: 'true'
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {1 && <img
            src= {post.userImg}
            alt=""
            style={{height:'40px'}}
          />}
          <div className="info">
          <p>Posted {moment(post.date).fromNow()} by <strong>{post.username && post.username}</strong></p>
          </div>
          {currentUser && (currentUser.username === post.username) && (
            <div className="edit">
              <Link to={`/create?edit=${post.id}`} state={post}>
                <FontAwesomeIcon icon={faEdit} className="edit-icon"  style={{textDecoration:'none',color:'green', height:'23px', marginRight:'5px'}}/>
              </Link>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="delete-icon"
                style={{textDecoration:'none',color:'red', height:'23px', marginLeft:'5px' ,  cursor: 'pointer'}}
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <img style={{ height: '400px', width: '100%' }} src={post.img} alt="" />

        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>
      </div>
      <Menu cat={post.category} currentPostId={post.id} />
    </div>
  );
};

export default SingleBlog;
