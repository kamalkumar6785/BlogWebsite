const express = require('express');
const  
{
  hasbookmarked,
  bookmarkBlog,
  unbookmakrBlog,
  bookmarkedBlogs
} =  require('../controllers/blogController.js');

const router = express.Router();

router.put("/add",bookmarkBlog);
router.put("/delete",unbookmakrBlog);
router.put("/bookmarked",bookmarkedBlogs);
router.put("/",hasbookmarked);

module.exports = router;
