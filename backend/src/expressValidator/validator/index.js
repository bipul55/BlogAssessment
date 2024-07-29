const { validationResult } = require("express-validator");
const { errorFormatter } = require("../../customResponse/index");
// This middleware should be used right after express validation schema. If there is any error on the validation, the middleware handles the error and sends the response to the user.
// If everything is good, lets user proceed to next middleware.
const validateReqestData = async (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    const error = result.array({ onlyFirstError: true })[0];

    return res.status(403).json({ ...error });
  } else {
    next();
  }
};

module.exports = { validateReqestData };
