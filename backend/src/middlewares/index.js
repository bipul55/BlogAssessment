const { token } = require("../utils/index");
const { success, resuableFalseError } = require("../customResponse");
const { PrismaClient } = require("@prisma/client");
const { User } = new PrismaClient();
// Checks the request for access_token and verifies it. Allows to proceed further only if the user is valid and logged in.
const authenticate = async (req, res, next) => {
  try {
    const bearer = req.headers["authorization"];
    if (bearer) {
      const _token = bearer.split(" ")[1];

      const requestUserData = await token.decryptToken(
        _token,
        process.env.JWTACCESSTOKENKEY
      );
      const _user = await User.findUnique({
        where: {
          id: requestUserData.id,
        },
      });
      if (!_user) {
        throw Error("User not found");
      }
      req.user = { ..._user };
      next();
    } else {
      throw Error("Missing Bearer Token");
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "false",
      message: err.message,
    });
  }
};
// Higher order function used to wrap the controller function. Handles error and responses.
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      const response_data = await fn(req, res);
      if (response_data === undefined) {
        throw Error("Something Went Wrong");
      }
      res.status(200).json(success(response_data, "success"));
    } catch (error) {
      console.log(error);
      res.status(520).json({
        status: "false",
        message: error.message,
      });
    }
  };
};

module.exports = { authenticate, asyncWrapper };
