import React, { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";

import axios from "axios";
import "../../styles/Home.css"; 
import Postcard from "../../components/postcard/Postcard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  const baseUrl = "http://localhost:4000/api";

  useEffect(() => {
    const fetchData = async () => {
      console.log(category);
      try {
        const res = await axios.get(`${baseUrl}/blog${category}`);

        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);



  return (
    <div className="home">

    {posts.length? <div className="posts">
        {posts.map((post) => (
        <Postcard key={post.id} post ={post}/>
        ))}
      </div> : <div style={{textAlign:'center', marginTop:'20px'}}>No Related Post Fount 😢</div>}

      
    </div>
  );
};

export default Home;
