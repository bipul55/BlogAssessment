// const { token, sendMail, bycript } = require("../../Util");
const { asyncWrapper } = require("../../../middlewares/index");
const authServices = require("../services/index");
const login = asyncWrapper(async (req) => {
  const { email, password } = req.body;
  const accessToken = await authServices.loginUser(email, password);
  if (accessToken) {
    return accessToken;
  } else {
    throw Error("Error while logging user");
  }
});

module.exports = login;
