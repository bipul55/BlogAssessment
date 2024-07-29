const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// creates access_token using jwtwebtoken
const createToken = async (object, key, expireIn) => {
  return jwt.sign(object, key, { expiresIn: expireIn });
};
// decrypt the access_token
const decryptToken = async (token, key) => {
  const tokenData = await jwt.verify(token, key);
  return tokenData;
};
// check if the token is valid or not
const tokenIsValid = async (timeOfIssueInSeconds) => {
  const now = Math.ceil(Date.now() / 1000);
  const diffDay = Math.floor((now - timeOfIssueInSeconds) / (60 * 60 * 24));
  if (diffDay > process.env.tokenLifeIndays) {
    return false;
  } else {
    return true;
  }
};

// pagination functionality.
const paginate = (data, page = 1, limit = 10) => {
  const p = parseInt(page ? page : 1);
  const l = parseInt(limit ? limit : 5);
  const startIndex = (p - 1) * l;
  const endIndex = p * l;
  const results = {};
  if (endIndex < data.length) {
    results.next = {
      page: p + 1,
      limit: l,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: p - 1,
      limit: l,
    };
  }
  results.result = data.splice(startIndex, endIndex);
  return results;
};

// Set storage engine for multer(file upload)
const storage = multer.diskStorage({
  destination: "./uploads", // folder where files will be stored
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 1MB file size limit
}).single("file");

module.exports = {
  token: { createToken, decryptToken, tokenIsValid },
  paginate,
  uploadFile,
};
