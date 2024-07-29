const { PrismaClient } = require("@prisma/client");
const { Blog } = new PrismaClient();

const deleteBlog = async (blogid, userid) => {
  try {
    const blog = await Blog.findUnique({
      where: {
        id: blogid,
      },
    });
    if (!blog) throw Error("Blog doesn't exists");
    if (blog.deleted) throw Error("Blog already deleted");
    if (blog.userid !== userid)
      throw Error("You do not have authorization to delete the blog");
    const deletedBlog = await Blog.update({
      where: {
        id: blogid,
      },
      data: {
        deleted: true,
      },
    });
    return { id: blog.id };
  } catch (e) {
    return false;
  }
};

module.exports = deleteBlog;
