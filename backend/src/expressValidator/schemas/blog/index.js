const { body } = require("express-validator");
const { isEmpty, isInvalid } = require("../../../customResponse");

const createBlogSchema = [
  body("topic")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("topic"))
    .isString()
    .withMessage(isInvalid("topic")),
  body("bannerImage")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("bannerImage")),
  body("description")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("description")),
  body("overview")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("overview")),
  body("category")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("category")),
  body("tags").not().isEmpty().trim().escape().withMessage(isEmpty("tags")),
];

const commentSchema = [
  body("body")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage(isEmpty("body"))
    .isString()
    .withMessage(isInvalid("body")),
  body("blogid").not().isEmpty().trim().escape().withMessage(isEmpty("blogid")),
];

module.exports = {
  createBlogSchema,
  commentSchema,
};
