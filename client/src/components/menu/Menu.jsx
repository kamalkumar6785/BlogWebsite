import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Menu.css"; // Adjust the path according to your project structure

const Menu = ({ cat }) => {
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
    <div className="menu" style={{textAlign:'center'}}>
      <h2>Recommended Blogs</h2>
      <div className="menu-grid">
        {posts.map((post) => (
          <div className="menupost" key={post.id}>
            <img src={post.img} alt=""  style={{height:'180px'}}/>
            <h3>{post.title.slice(0,20)}</h3>
            <button className="menubotton" style={{ display: 'none' }}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
