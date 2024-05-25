const User = require("../models/user");

const checkUserById = (req, res, next) => {
  const { id } = req.user;
  User.findByUserId(id, (_, data) => {
    if (!data) {
      res.status(400).send({
        status: "error",
        message: `User not found`,
      });
      return;
    }
    next();
  });
};

module.exports = checkUserById;
