const { PrismaClient } = require("@prisma/client");
const { User } = new PrismaClient();
const { token } = require("../../../utils/index");
const bcrypt = require("bcrypt");

const loginUser = async (email, password) => {
  try {
    const user = await User.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw Error("User not registered through this email.");
    if (!(await bcrypt.compare(password, user.password)))
      throw Error("Password Incorrect.");
    // if (!user.emailConfirm)
    //   throw Error("Email not verified, please verify your email.");
    const accessToken = await token.createToken(
      {
        ...user,
      },
      process.env.JWTACCESSTOKENKEY,
      process.env.ACCESSTOKENLIFE
    );
    return { accessToken: accessToken };
  } catch (e) {
    throw Error(e.message);
    return false;
  }
};

module.exports = loginUser;
