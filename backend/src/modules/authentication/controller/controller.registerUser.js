// const { token, sendMail, bycript } = require("../../Util");
const { asyncWrapper } = require("../../../middlewares/index");
const authServices = require("../services/index");
const register = asyncWrapper(async (req) => {
  const { email, password, fname, mname, lname } = req.body;
  const newUser = await authServices.registerUser(
    email,
    password,
    fname,
    mname,
    lname
  );
  if (newUser) {
    return newUser;
  } else {
    throw Error("Error while registering user");
  }
});

module.exports = register;
