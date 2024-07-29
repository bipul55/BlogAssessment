const createBlog = require("./service.createBlog");
const deleteBlog = require("./service.deleteBlog");
const updateBlog = require("./service.updateBlog");
const getBlogById = require("./service.getBlogById");
const getBlogs = require("./service.getBlogs");
const createComment = require("./service.createComment");

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getBlogs,
  createComment,
};
