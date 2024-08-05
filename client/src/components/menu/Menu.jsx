import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css"; 
import { Link } from 'react-router-dom';

const Menu = ({ cat ,currentPostId }) => {
  const [posts, setPosts] = useState([]);
  const baseUrl = 'http://localhost:4000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/blog/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu" style={{ textAlign: 'center' }}>
     {posts.filter(post => post.id !== currentPostId).length>0 && <h2>Recommended Blogs</h2>}
    <div className="menu-grid">
      {posts.filter(post => post.id !== currentPostId).map((post) => (
        <Link to={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
          <div className="menupost">
            <img src={post.img} alt="" style={{ height: '180px' }} />
            <h3>{post.title.slice(0, 20) +"..."}</h3>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Menu;
