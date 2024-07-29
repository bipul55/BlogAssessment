// const { token, sendMail, bycript } = require("../../Util");
const { asyncWrapper } = require("../../../middlewares/index");
const authServices = require("../services/index");
const verifyToken = asyncWrapper(async (req) => {
  if (req.user) {
    return req.user;
  } else {
    throw Error("No Users");
  }
});

module.exports = verifyToken;
