const { asyncWrapper } = require("../../../middlewares/index");
const blogServices = require("../services/index");

const updateBlog = asyncWrapper(async (req) => {
  const { id } = req.params;
  const { topic, description, bannerImage, category, tags } = req.body;

  const updatedBlog = await blogServices.updateBlog(
    id,
    topic,
    description,
    bannerImage,
    category,
    tags,
    req.user.id
  );
  if (updatedBlog) {
    return updatedBlog;
  } else {
    throw Error("Error while updating blog");
  }
});

module.exports = updateBlog;
