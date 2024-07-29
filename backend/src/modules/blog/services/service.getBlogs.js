const { PrismaClient } = require("@prisma/client");
const { paginate } = require("../../../utils");
const { Blog } = new PrismaClient();

const getBlogs = async (searchText = "", page = 1, limit = 10) => {
  try {
    const blogs = await Blog.findMany({
      where: {
        AND: [
          {
            deleted: false,
          },
          {
            OR: [
              {
                topic: {
                  contains: searchText,
                },
              },
              {
                description: {
                  contains: searchText,
                },
              },
              {
                tags: {
                  contains: searchText,
                },
              },
              {
                category: {
                  contains: searchText,
                },
              },
            ],
          },
        ],
      },
      select: {
        id: true,
      },
    });
    if (blogs) {
      return paginate(blogs, page, limit);
    }
    throw Error("Blog not found");
  } catch (e) {
    console.log(e);
    return false;
  }
};
module.exports = getBlogs;
