import React, { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";

import axios from "axios";
import "../../styles/Home.css"; 
import Postcard from "../../components/postcard/Postcard";

const Bookmarked = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  const baseUrl = "http://localhost:4000/api";

  useEffect(() => {
    const fetchData = async () => {

        
      try {

        const res = await axios.put(`${baseUrl}/bookmark/bookmarked` ,{}, {
            withCredentials: true,
          }) ;

        
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="home">
    
    <div style={{textAlign:'center'}}>
        <h1>My Bookmarks</h1>
    </div>
    {posts.length? <div className="posts">
        {posts.map((post) => (
        <Postcard key={post.id} post ={post}/>
        ))}
      </div> : <div style={{textAlign:'center', marginTop:'20px'}}>No Bookmarks Found 😢</div>}

      
    </div>
  );
};

export default Bookmarked;
