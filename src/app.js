const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const { httpLogStream } = require("./utility/logger");

const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from the .env file located in the root directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(morgan("combined", { stream: httpLogStream }));
app.use(cors());

app.use("/api", authRoute);
app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      message: "API working fine",
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
  next();
});

module.exports = app;
