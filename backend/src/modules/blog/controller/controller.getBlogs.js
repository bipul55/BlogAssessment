const { asyncWrapper } = require("../../../middlewares/index");
const blogServices = require("../services/index");
const getBlogs = asyncWrapper(async (req) => {
  const { search, page, limit } = req.query;
  const blogs = await blogServices.getBlogs(search, page, limit);
  if (blogs) {
    return blogs;
  } else {
    throw Error("Error while fetching blog");
  }
});

module.exports = getBlogs;
