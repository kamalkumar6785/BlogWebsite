import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Spinner from "../../components/spinner/Spinner";
import "../../styles/Create.css";
import { AuthContext } from "../../context/authContext";
import Notauthenicated from "../../components/notauthenticated/Notauthenicated";
const Create = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.content || "");
  const [title, setTitle] = useState(state?.title || "");
  const [category, setCat] = useState(state?.category || "");
  const [loading,setloading] = useState(false);
  const [err, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(state?.img || "");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const baseUrl = "http://localhost:4000/api";
  const categoryEmojis = {
    science: "🚀",
    art: "🎨",
    entertainment: "🎬",
    finance: "💲",
    health: "🩺",
    gaming: "🎮",
    news: "📰",
  };


  const upload = async (selectedFile) => {


    console.log(selectedFile);

    try {
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error("Error uploading file:", error);
            setError("Error uploading file. Please try again.");
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              console.error("Error getting download URL:", error);
              setError("Error retrieving file URL. Please try again.");
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      console.error("Unexpected error during upload:", error);
      setError("Unexpected error during upload. Please try again.");
      return "";
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        title,
        content: value,
        category,
        img: previewUrl,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      if (state) {
        await axios.put(`${baseUrl}/blog/${state.id}`, postData, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${baseUrl}/blog`, postData, {
          withCredentials: true,
        });
      }

      navigate("/");
    } catch (err) {
      console.error("Error publishing blog:", err);
      setError("Error publishing blog. Please try again.");
    }
  };

  const handleFileChange = async (e) => {

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        setloading(true);
        const imgUrl = await upload(selectedFile);
        setloading(false);
        setPreviewUrl(imgUrl);
      } catch (error) {
        console.error("Error handling file change:", error);
        setError("Error handling file change. Please try again.");
      }
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    
      currentUser ? 
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <div style={{ textAlign: "center" }}>
              <h1>Select Category</h1>
            </div>
  
            {[
              "science",
              "art",
              "entertainment",
              "finance",
              "health",
              "gaming",
              "news",
            ].map((cat) => (
              <div className="cat" key={cat}>
                <input
                  type="radio"
                  checked={category === cat}
                  name="cat"
                  value={cat}
                  id={cat}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1) +" "+ categoryEmojis[cat]}
                </label>
              </div>
            ))}
  
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <img
                src={
                  previewUrl ||
                  "https://linamed.com/wp-content/themes/dfd-native/assets/images/no_image_resized_675-450.jpg"
                }
                alt="Selected File"
                style={{
                  height: "150px",
                  borderRadius: "12px",
                  display: "block",
                  border: "1px solid black",
                  margin: "0 auto",
                }}
              />
            </div>
  
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
            />
            <label className="file" htmlFor="file" style={{ marginTop: "20px" }}>
              {loading? <Spinner  />:previewUrl ? "Change Image" : "Upload Image" }
              
            </label>
  
            <div className="buttons">
              <button onClick={handleClick}>Publish Blog</button>
            </div>
          </div>
          {err && <p className="error">{err}</p>}
        </div>
      </div>
      
      :
      
<Notauthenicated/>      

  );
};

export default Create;
