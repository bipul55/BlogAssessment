const { PrismaClient } = require("@prisma/client");
const { Blog } = new PrismaClient();

const updateBlog = async (
  blogid,
  topic,
  description,
  bannerImage,
  category,
  tags,
  userid
) => {
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
    const updatedBlog = await Blog.update({
      where: {
        id: blogid,
      },
      data: {
        topic,
        description,
        bannerImage,
        category,
        tags,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = updateBlog;
