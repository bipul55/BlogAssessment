const { PrismaClient } = require("@prisma/client");
const { Comment } = new PrismaClient();

const createComment = async (body, blogid, userid) => {
  try {
    const newComment = await Comment.create({
      data: {
        body,
        blogid,
        userid,
      },
    });

    return { newComment };
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = createComment;
