import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Menu from "../../components/menu/Menu";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt,faShareNodes , faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart,faBell } from "@fortawesome/free-regular-svg-icons";

import '../../styles/Single.css';

const SingleBlog = () => {
  const [post, setPost] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked,setisLiked] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  const baseUrl = 'http://localhost:4000/api';

  const handleLike =async () => {

    if(isLiked)
    {
      try {
        const res = await axios.post(`${baseUrl}/like/remove`,{postId},{
          withCredentials: 'true'
        });
        setLikeCount(likeCount - 1);
        setisLiked(false);
      } catch (err) {
        console.log(err);
      }
     
    }else
    {
    const res = await axios.post(`${baseUrl}/like/add`,{postId},{
      withCredentials: 'true'
    });

      setLikeCount(likeCount + 1);
      setisLiked(true);
    }
  };

  const likeButtonStyle = {
    color:isLiked?'red':'black',
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

    const fetchLikes = async ()=>{
      try {

        const res = await axios.put(`${baseUrl}/like/likes`,{postId},{  withCredentials:'true'  }  )
        setLikeCount(res.data.likeCount);

      } catch (err) {
        
      }
    }

    const fetchHasLiked = async ()=>{
      try {
        const res = await axios.put(`${baseUrl}/like/liked`,{postId},{  withCredentials:'true'  }  )
        
        setisLiked(res.data.liked);  
      }
         catch (error) {
      }
    }
    fetchData();
    fetchLikes();
    fetchHasLiked();

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
   <div style={{ fontSize: '29px'}}>
      <span
        style={likeButtonStyle}
        onClick={handleLike}
      >
            {isLiked ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={regularHeart} />}
            </span>
      {` ${likeCount}`}


      <button style={{marginLeft:'200px',background:'black',color:'gold',fontWeight:'bolder'}}>Subscribe
      <FontAwesomeIcon icon={faBell} style={{marginLeft:'6px'}}/>
      </button>
      <span style={{fontSize:'30px',marginLeft:'200px',color:'blue'}}><FontAwesomeIcon icon={faShareNodes} /> </span>
    </div>

  </div>
      <Menu cat={post.category} currentPostId={post.id} />
    </div>
  );
};

export default SingleBlog;
