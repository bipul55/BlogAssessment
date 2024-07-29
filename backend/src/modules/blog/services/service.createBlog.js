const { PrismaClient } = require("@prisma/client");
const { Blog } = new PrismaClient();

const createBlog = async (
  topic,
  description,
  bannerImage,
  category,
  tags,
  user,
  overview
) => {
  try {
    const newBlog = await Blog.create({
      data: {
        topic,
        description,
        bannerImage,
        category,
        tags,
        userid: user.id,
        overview,
      },
    });

    return { newBlog };
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = createBlog;
