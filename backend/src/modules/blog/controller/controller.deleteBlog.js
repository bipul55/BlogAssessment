const { asyncWrapper } = require("../../../middlewares/index");
const blogServices = require("../services/index");

const deleteBlog = asyncWrapper(async (req) => {
  const { id } = req.params;

  const _delete = await blogServices.deleteBlog(id, req.user.id);
  if (_delete) {
    return _delete;
  } else {
    throw Error("Error while deleting user");
  }
});

module.exports = deleteBlog;
