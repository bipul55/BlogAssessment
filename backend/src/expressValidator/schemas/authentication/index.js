const { body } = require("express-validator");
const { isEmpty, isInvalid } = require("../../../customResponse");

const loginSchema = [
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("email"))
    .isEmail()
    .withMessage(isInvalid("email")),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("password")),
];
const registerSchema = [
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("email"))
    .isEmail()
    .withMessage(isInvalid("email")),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("password")),
  body("fname").not().isEmpty().trim().escape().withMessage(isEmpty("fname")),
  body("lname").not().isEmpty().trim().escape().withMessage(isEmpty("lname")),
];

const updateProfileSchema = [
  body("email")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("email"))
    .isEmail()
    .withMessage(isInvalid("email")),
  body("fname").not().isEmpty().trim().escape().withMessage(isEmpty("fname")),
  body("lname").not().isEmpty().trim().escape().withMessage(isEmpty("lname")),
  body("id").not().isEmpty().trim().escape().withMessage(isEmpty("id")),
];

module.exports = {
  loginSchema,
  registerSchema,
  updateProfileSchema,
};
