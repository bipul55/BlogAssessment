const { asyncWrapper } = require("../../../middlewares/index");
const blogServices = require("../services/index");

const createBlog = asyncWrapper(async (req) => {
  const { topic, description, bannerImage, category, tags, overview } =
    req.body;
  const newBlog = await blogServices.createBlog(
    topic,
    description,
    bannerImage,
    category,
    tags,
    req.user,
    overview
  );
  if (newBlog) {
    return newBlog;
  } else {
    throw Error("Error while creating blog");
  }
});

module.exports = createBlog;
