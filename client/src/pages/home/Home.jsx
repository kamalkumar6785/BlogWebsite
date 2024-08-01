import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import "../../styles/Home.css"; // Reusing the same CSS as Register

const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search;
  const baseUrl = "http://localhost:4000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/blog${category}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">

    {posts.length? <div className="posts">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="link"
            style={{ textDecoration: "none" }}
          >
            <div className="post">
              <div className="img-container">
                <img src={post.img} alt="" className="post-img" />
                <div className="category-label">{post.category}</div> 
              </div>
              <div className="Homecontent">
                <h1>{post.title.slice(0, 20)}</h1>
                <p>{getText(post.content).slice(0, 120)}...</p>
                <div style={{ textAlign: "center" }}>
                  <button style={{ backgroundColor: 'black' }}>Read More</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div> : <div style={{textAlign:'center', marginTop:'20px'}}>No Related Post Fount 😢</div>}

      
    </div>
  );
};

export default Home;
