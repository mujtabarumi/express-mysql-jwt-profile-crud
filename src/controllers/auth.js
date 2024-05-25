const User = require("../models/user");
const { hash: hashPassword, compare: comparePassword } = require("../utility/password");
const { generate: generateToken } = require("../utility/token");

exports.signup = (req, res) => {
  const { first_name, last_name, email, password, dob, gender, profile_image } = req.body;
  const hashedPassword = hashPassword(password.trim());

  const user = new User(first_name.trim(), last_name.trim(), email.trim(), hashedPassword, dob, gender, profile_image);

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    } else {
      const token = generateToken(data.id);
      res.status(201).send({
        status: "success",
        data: {
          token,
          data,
        },
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email.trim(), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: "error",
          message: `User with email ${email} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    if (data) {
      if (comparePassword(password.trim(), data.password)) {
        const token = generateToken(data.id);
        res.status(200).send({
          status: "success",
          data: {
            token,
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            dob: data.dob,
            gender: data.gender,
            profile_image: data.profile_image,
          },
        });
        return;
      }
      res.status(401).send({
        status: "error",
        message: "Incorrect password",
      });
    }
  });
};
