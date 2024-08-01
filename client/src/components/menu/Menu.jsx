import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({cat}) => {
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
    <div className="menu">
      <h1>Other posts you may slike</h1>
      {posts.map((post) => (
        <div className="menupost" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
          <button style={{color:'black'}}>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
