const { PrismaClient } = require("@prisma/client");
const { User } = new PrismaClient();

const updateProfile = async (
  id,
  email,
  profilePic,
  fname,
  mname,
  lname,
  bio
) => {
  console.log(bio);
  try {
    if (
      !(await User.findUnique({
        where: {
          id: id,
        },
      }))
    ) {
      throw Error("User Not Found");
    }
    const updatedUser = await User.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        fname: fname,
        mname: mname,
        lname: lname,
        profilePic: profilePic,
        bio,
      },
    });

    return { updatedUser };
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = updateProfile;
