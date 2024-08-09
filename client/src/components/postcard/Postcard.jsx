import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

const Postcard = ({post}) => {
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
      };
  return (
    <Link
    to={`/blog/${post.id}`}
    key={post.id}
    className="link"
    style={{ textDecoration: "none" }}
  >
    <div className="post">
      <div className="img-container">
        <img src={post.img} alt="" className="post-img" />
        <div className="category-label" style={{fontWeight:'bolder'}}>{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</div> 
      </div>
      <div className="Homecontent">
        <div style={{minHeight:'70px'}}>

        <h1>{post.title.length > 40 ? post.title.slice(0, 40) + "..." : post.title}</h1>
        </div>
        <p>{getText(post.content).slice(0, 120)}...</p>
        <div style={{ textAlign: "center" }}>
          <button style={{ backgroundColor: 'black' }}>Read More</button>
        </div>
      </div>
    </div>
  </Link>  )
}

export default Postcard