// const { token, sendMail, bycript } = require("../../Util");
const { asyncWrapper } = require("../../../middlewares/index");
const authServices = require("../services/index");
const updateProfile = asyncWrapper(async (req) => {
  const { id, email, profilePic, fname, mname, lname, bio } = req.body;
  console.log(bio);
  const updatedUser = await authServices.updateProfile(
    id,
    email,
    profilePic,
    fname,
    mname,
    lname,
    bio
  );
  if (updatedUser) {
    return updatedUser;
  } else {
    throw Error("Error while updating user");
  }
});

module.exports = updateProfile;
