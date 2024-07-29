const { PrismaClient } = require("@prisma/client");
const { User } = new PrismaClient();
const bcrypt = require("bcrypt");

const generateSalt = async () => {
  return await bcrypt.genSalt(parseInt(process.env.BYCRYPTSALTROUND));
};

const registerUser = async (email, password, fname, mname, lname) => {
  try {
    if (
      await User.findUnique({
        where: {
          email: email,
        },
      })
    ) {
      throw Error("Email Already In Use");
    }
    const hashedPassword = await bcrypt.hash(password, await generateSalt());
    const newUser = await User.create({
      data: {
        email: email,
        password: hashedPassword,
        fname: fname,
        mname: mname,
        lname: lname,
      },
    });

    // await sendMail.confirmEmail(newUser.email, newUser.uuid);
    return { newUser };
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = registerUser;
