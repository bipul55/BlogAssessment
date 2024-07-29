const { asyncWrapper } = require("../../../middlewares/index");
const blogServices = require("../services/index");

const getBlogById = asyncWrapper(async (req) => {
  const { id } = req.params;
  const blog = await blogServices.getBlogById(id);
  if (blog) {
    return blog;
  } else {
    throw Error("Error while fetching blog");
  }
});

module.exports = getBlogById;
