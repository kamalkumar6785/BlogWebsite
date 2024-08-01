import React,{ useEffect ,useState} from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import '../../styles/Home.css'; // Reusing the same CSS as Register
const Home = () => {
  const [posts, setPosts] = useState([]);
  const category = useLocation().search
  const baseUrl = 'http://localhost:4000/api';

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


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="home">
    <div className="posts">
        {posts.map((post) => (
          <Link to={`/blog/${post.id}`} key={post.id} className="link" style={{textDecoration:'none'}}>
            <div className="post">
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="Homecontent">
                <h1>{post.title.slice(0, 20)}</h1>
                <p>{getText(post.content).slice(0, 120)}...</p>
                <button>Read More</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
