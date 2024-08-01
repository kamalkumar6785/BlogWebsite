import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { storage } from "../../Firebase"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../../styles/Create.css'

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const upload = async () => {
    if (!file) return "";

    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
        
        },
        (error) => {
          console.error("Error uploading file:", error);
          setError("Error uploading file. Please try again.");
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            setError("Error retrieving file URL. Please try again.");
            reject(error);
          }
        }
      );


    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const imgUrl = await upload();
      const postData = {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      if (state) {
        await axios.put(`/posts/${state.id}`, postData);
      } else {
        await axios.post(`/posts/`, postData);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Error publishing blog. Please try again.");
    }
  };

  return (
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
          <div style={{ textAlign: 'center' }}>
            <h1>Select Category</h1>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science 🚀</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art 🎨</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "entertainment"}
              name="cat"
              value="entertainment"
              id="entertainment"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="entertainment">Entertainment 🎬</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "finance"}
              name="cat"
              value="finance"
              id="finance"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="finance">Finance 💲</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"}
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="health">Health 🩺</label>
          </div>

          <div className="cat">
        <input
            type="radio"
            checked={cat === "gaming"}
            name="cat"
            value="gaming"
            id="gaming"
            onChange={(e) => setCat(e.target.value)}
        />
        <label htmlFor="gaming">Gaming 🎮</label>
        </div>


        <div className="cat">
        <input
            type="radio"
            checked={cat === "news"}
            name="cat"
            value="news"
            id="news"
            onChange={(e) => setCat(e.target.value)}
        />
        <label htmlFor="news">NEWS 📰</label>
        </div>


        {/* Adding a margin-bottom to the last category */}
        <div style={{ marginBottom: '20px' }}></div> 

        <input
        style={{ display: "none" }}
        type="file"
        id="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="file" htmlFor="file" style={{ marginTop: '20px' }}>
        Upload Image
        </label>


          <div className="buttons">
            <button  onClick={handleClick}>Publish Blog</button>
          </div>
        </div>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  );
};

export default Write;
