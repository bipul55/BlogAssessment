const createBlog = require("./controller.createBlog.js");
const deleteBlog = require("./controller.deleteBlog.js");
const updateBlog = require("./controller.updateBlog.js");
const getBlogById = require("./controller.getBlogById.js");
const getBlogs = require("./controller.getBlogs.js");
const createComment = require("./controller.createComment.js");
module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  getBlogs,
  createComment,
};
