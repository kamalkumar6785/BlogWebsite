import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../../components/menu/Menu";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faBookmark,faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart, faBell } from "@fortawesome/free-regular-svg-icons";
import ShareButton from "../../components/sharebutton/Sharebutton";
import '../../styles/Single.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "../notfound/Notfound";

const SingleBlog = () => {
  const [post, setPost] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked,setIsBookmarked] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const baseUrl = 'http://localhost:4000/api';

  const handleLike = async () => {

    if(!currentUser)
    {
      navigate('/login');
    }
    try {
      if (isLiked) {
        await axios.post(`${baseUrl}/like/remove`, { postId }, { withCredentials: 'true' });
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      } else {
        await axios.post(`${baseUrl}/like/add`, { postId }, { withCredentials: 'true' });
        setLikeCount(likeCount + 1);
        setIsLiked(true);
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };


  const handleBookmark = async () => {

    if(!currentUser)
    {
      navigate('/login');
    }
    try {
      if (isBookmarked) {
        await axios.put(`${baseUrl}/bookmark/delete`, { postId }, { withCredentials: true });
        setIsBookmarked(false);
      } else {
        await axios.put(`${baseUrl}/bookmark/add`, { postId }, { withCredentials: true });
        setIsBookmarked(true);
      }
    } catch (err) {
      toast.error("An error occurred");

    }
    
  };

  const likeButtonStyle = {
    color: isLiked ? 'red' : 'black',
    fontSize: '30px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/blog/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchLikes = async () => {
      try {
        const res = await axios.put(`${baseUrl}/like/likes`, { postId }, { withCredentials: 'true' });
        setLikeCount(res.data.likeCount);
      } catch (err) {
        console.log(err);
      }
    }

    const fetchHasLiked = async () => {
      try {
        const res = await axios.put(`${baseUrl}/like/liked`, { postId }, { withCredentials: 'true' });
        setIsLiked(res.data.liked);

      } catch (err) {
        console.log(err);
      }
    }


    const fetchHasBookmarked = async () => {
      try 
      {
        const res = await axios.put(`${baseUrl}/bookmark`, { postId }, { withCredentials: 'true' });
        setIsBookmarked(res.data.bookmarked);
        console.log(res.data.bookmarked)
      } 
      catch (err) 
      {
        console.log(err);
      }
    }


    fetchData();
    fetchLikes();
    fetchHasLiked();
    fetchHasBookmarked();
    
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/blog/${postId}`, { withCredentials: 'true' });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  if (!post) {
    return <NotFound blog={true} />;
  }

  return (


  
   

    <div className="single">
      <ToastContainer />
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {1 && (
            <img
              src={post.userImg}
              alt=""
              style={{ height: '40px' }}
            />
          )}
          <div className="info">
            <p>Posted {moment(post.date).fromNow()} by <strong>{post.username && post.username}</strong></p>
          </div>
          {currentUser && (currentUser.username === post.username) && (
            <div className="edit">
              <Link to={`/create?edit=${post.id}`} state={post}>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" style={{ textDecoration: 'none', color: 'green', height: '23px', marginRight: '5px' }} />
              </Link>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="delete-icon"
                style={{ textDecoration: 'none', color: 'red', height: '23px', marginLeft: '5px', cursor: 'pointer' }}
                onClick={handleDelete}
              />
                <FontAwesomeIcon icon={faBookmark} onClick={handleBookmark}
                style={{ textDecoration: 'none', color: isBookmarked?'blue':'grey', height: '30px', marginLeft: '15px', cursor: 'pointer' }}
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
        <div style={{ fontSize: '29px' }}>
          <span
            style={likeButtonStyle}
            onClick={handleLike}
          >
            {isLiked ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={regularHeart} />}
          </span>
          {` ${likeCount}`}
          <button style={{ marginLeft: '200px', background: 'black', color: isBookmarked?'gold':'grey', fontWeight: 'bolder' }}>Subscribe
            <FontAwesomeIcon icon={faBell} style={{ marginLeft: '6px' }} />
          </button>
          <span style={{ marginLeft: '200px', fontSize: '30px' }}>
            <ShareButton />
          </span>
        </div>
      </div>
      <Menu cat={post.category} currentPostId={post.id} />
    </div>
  );
};

export default SingleBlog;
