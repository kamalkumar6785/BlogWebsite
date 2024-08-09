const express = require('express');
const  
{
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  getmyBlogs
} =  require('../controllers/blogController.js');

const router = express.Router();

router.put("/myblogs",getmyBlogs)
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", addBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);


module.exports = router;
