const jwt = require('jsonwebtoken');
const { db } = require('../database.js'); 

 const getBlogs = (req, res) => 
{
    const q = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};



 const getBlog = (req, res) => 
{
  const q =
    "SELECT p.id, `username`, `title`, `content`, p.img, u.profilepic AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

 const addBlog = (req, res) => 
{

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
  if (err) return res.status(403).json("Token is not valid!");


    const q = "INSERT INTO posts(`title`, `content`, `img`, `category`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.content,
      req.body.img,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
console.log("posting done")
};

 const deleteBlog = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};

 const updateBlog = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`content`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.content, req.body.img, req.body.category];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};



const bookmarkBlog = (req, res) => 
  {   
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO bookmarks (`userid`, `postid`) VALUES (?, ?)";
      const values = [userInfo.id, req.body.postId];
      console.log(values)

      db.query(q, values, (err, data) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json("Already bookmarked.");
          }
          return res.status(500).json(err);
        }
  
        return res.status(201).json("Bookmarked successfully");
      });
    });
  };

  
  const unbookmakrBlog = (req, res) => {

    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM bookmarks WHERE `userid` = ? AND `postid` = ?";
      const values = [userInfo.id, req.body.postId];
  
      console.log(values)
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
  
        return res.status(200).json("Removed Bookmark successfully.");
      });
    });
  };
  

  const hasbookmarked = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const q = "SELECT COUNT(*) AS bookmarked FROM bookmarks WHERE userid = ? AND postid = ?";
      const values = [userInfo.id, req.body.postId];

      db.query(q, values, (err, data) => 
      {
        if (err) return res.status(500).json(err);
        const bookmarked = data[0].bookmarked > 0;
        return res.status(200).json({ bookmarked });
      });

    });
  };



  
  const bookmarkedBlogs = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `
            SELECT p.id, p.title, p.content, p.img, p.category, p.date 
            FROM posts p 
            JOIN bookmarks b ON p.id = b.postid 
            WHERE b.userid = ?
        `;

        const values = [userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    });
};

module.exports = {
    getBlog,
    getBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    bookmarkBlog,
    unbookmakrBlog,
    hasbookmarked,
    bookmarkedBlogs
  };
  