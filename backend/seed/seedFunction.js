const { PrismaClient } = require("@prisma/client");
const { User, Blog } = new PrismaClient();

const { users, blogs } = require("./seedData");

async function main() {
  const _users = await User.createMany({ data: [...users] });
  const _blogs = await Blog.createMany({ data: [...blogs] });
}
main();
