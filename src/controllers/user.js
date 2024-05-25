const User = require("../models/user");
const { hash: hashPassword } = require("../utility/password");

exports.uploadProfileImage = (req, res) => {
  const { filename } = req.file;
  const { id } = req.user;

  console.log("filename", req.file);

  User.uploadProfileImage(filename, id, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "success",
        data: {
          data,
        },
      });
    }
  });
};

exports.getAllUser = (req, res) => {
  User.getAllUser((err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "success",
        data: {
          data,
        },
      });
    }
  });
};

exports.getProfile = (req, res) => {
  const { id } = req.user;
  User.findByUserId(id, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "success",
        data: {
          data,
        },
      });
    }
  });
};

exports.updateProfile = (req, res) => {
  const { first_name, last_name, email, password, dob, gender } = req.body;

  const { id } = req.user;

  const user = {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    gender: gender,
    dob: dob,
    email: email.trim(),
  };

  User.update(user, id, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "success",
        data: data,
      });
    }
  });
};

exports.deleteProfile = (req, res) => {
  const { id } = req.user;
  User.deleteByUserId(id, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      res.status(201).send({
        status: "deleted",
      });
    }
  });
};
