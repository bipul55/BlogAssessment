const { PrismaClient } = require("@prisma/client");
const { Blog } = new PrismaClient();

const getBlogById = async (blogid) => {
  try {
    const _blog = await Blog.findUnique({
      where: {
        id: blogid,
        deleted: false,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    if (_blog) {
      return { _blog };
    }
    throw Error("Blog not found");
  } catch (e) {
    return false;
  }
};

module.exports = getBlogById;
