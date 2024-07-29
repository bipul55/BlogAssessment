const { asyncWrapper } = require("../../../middlewares/index");
const blogServices = require("../services/index");

const createComment = asyncWrapper(async (req) => {
  const { body, blogid } = req.body;
  const { id } = req.user;
  const newComment = await blogServices.createComment(body, blogid, id);
  if (newComment) {
    return newComment;
  } else {
    throw Error("Error while creating comment");
  }
});

module.exports = createComment;
