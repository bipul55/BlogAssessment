const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyToken,
  updateProfile,
} = require("../../modules/authentication/controller/index");
const {
  schema: {
    authentication: { loginSchema, registerSchema, updateProfileSchema },
  },
  validation: { validateReqestData },
} = require("../../expressValidator/index");
const { authenticate } = require("../../middlewares");
router.post("/register", registerSchema, validateReqestData, registerUser);
router.post("/login", loginSchema, validateReqestData, loginUser);
router.post("/update", updateProfileSchema, validateReqestData, updateProfile);

router.get("/verifyToken", authenticate, verifyToken);

module.exports = router;
