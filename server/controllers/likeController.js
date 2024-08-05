const jwt = require('jsonwebtoken');
const { db } = require('../database.js'); 

const likeBlog = (req, res) => 
{
    
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likehistory (`userId`, `postId`) VALUES (?, ?)";
    const values = [userInfo.id, req.body.postId];

    db.query(q, values, (err, data) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json("User already liked this post.");
        }
        return res.status(500).json(err);
      }

      return res.status(201).json("Post liked successfully.");
    });
  });
};

const unlikeBlog = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likehistory WHERE `userId` = ? AND `postId` = ?";
    const values = [userInfo.id, req.body.postId];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post unliked successfully.");
    });
  });
};


const hasLiked = (req, res) => {

    const token = req.cookies.access_token;
  
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "SELECT COUNT(*) AS liked FROM likehistory WHERE userId = ? AND postId = ?";
      const values = [userInfo.id, req.body.postId];

  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
  
        const liked = data[0].liked > 0;
        return res.status(200).json({ liked });
      });
    });
  };
  


const numberOfLikes = (req, res) => {

    const q = "SELECT COUNT(*) AS likeCount FROM likehistory WHERE postId = ?";
    const values = [req.body.postId];
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
  
      return res.status(200).json({ likeCount: data[0].likeCount });
    });
  };

  

module.exports = {
  likeBlog,
  unlikeBlog,
  hasLiked,
  numberOfLikes
};
