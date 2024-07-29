const express = require("express");
const router = express.Router();
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getBlogs,
  createComment,
} = require("../../modules/blog/controller/index");
const {
  schema: {
    blog: { commentSchema, createBlogSchema },
  },
  validation: { validateReqestData },
} = require("../../expressValidator/index");
router.get("/", getBlogs);

router.get("/:id", getBlogById);

router.post("/create", createBlogSchema, validateReqestData, createBlog);
router.post("/comment/add", commentSchema, validateReqestData, createComment);

router.post("/delete/:id", deleteBlog);
router.post("/update/:id", createBlogSchema, validateReqestData, updateBlog);

module.exports = router;
