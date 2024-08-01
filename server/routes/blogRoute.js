const express = require('express');
const  {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} =  require('../controllers/blogController.js');

const router = express.Router();
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", addBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);


module.exports = router;
