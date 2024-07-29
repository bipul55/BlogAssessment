const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/index");
const { uploadFile } = require("../utils");

router.use("/auth", require("./auth"));

router.use("/blog", authenticate, require("./blog"));

router.post("/upload", (req, res) => {
  uploadFile(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).send({ message: "No file selected!" });
      } else {
        res.send({
          message: "File uploaded successfully!",
          file: req.file.filename,
        });
      }
    }
  });
});
module.exports = router;
