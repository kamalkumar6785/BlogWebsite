const express = require('express');
const  {
  likeBlog,unlikeBlog,
  numberOfLikes,
  hasLiked
} =  require('../controllers/likeController.js');

const router = express.Router();

router.post("/add", likeBlog);
router.post("/remove", unlikeBlog);
router.put("/likes", numberOfLikes);
router.put("/liked", hasLiked);


module.exports = router;
