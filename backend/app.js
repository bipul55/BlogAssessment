require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const corsOptions = require("./src/config/corsConfig");
const PORT = process.env.PORT;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/apiV1", require("./src/Routes/index"));

app.get("/file/:name", (req, res) => {
  const { name } = req.params;
  try {
    res.sendFile(path.join(__dirname, "./uploads", name));
  } catch (err) {
    res.status(404);
  }
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
