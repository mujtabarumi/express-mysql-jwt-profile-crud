const db = require("../config/db.config");
const {
  createNewUser: createNewUserQuery,
  findUserByEmail: findUserByEmailQuery,
  findUserById: findUserByIdQuery,
  updateUserById: updateUserByIdQuery,
  deleteByUserId: deleteByUserIdQuery,
  findAllUser: findAllUserQuery,
  uploadProfileImage: uploadProfileImageQuery,
} = require("../database/queries");
const { logger } = require("../utility/logger");

class User {
  constructor(first_name, last_name, email, password, dob, gender, profile_image) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.gender = gender;
    this.profile_image = profile_image;
  }

  static create(newUser, cb) {
    db.query(createNewUserQuery, [newUser.first_name, newUser.last_name, newUser.gender, newUser.dob, newUser.email, newUser.password, newUser.profile_image], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, {
        id: res.insertId,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        dob: newUser.dob,
        gender: newUser.gender,
        profile_image: newUser.profile_image,
        password: newUser.password,
      });
    });
  }

  static update(newUser, id, cb) {
    db.query(updateUserByIdQuery, [newUser.first_name, newUser.last_name, newUser.gender, newUser.dob, newUser.email, id], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      cb(null, {
        id: id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        dob: newUser.dob,
        gender: newUser.gender,
        profile_image: newUser.profile_image,
        password: newUser.password,
      });
    });
  }

  static deleteByUserId(userId, cb) {
    db.query(deleteByUserIdQuery, userId, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      return cb(null, true);
    });
  }

  static findByEmail(email, cb) {
    db.query(findUserByEmailQuery, email, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res[0]);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }

  static findByUserId(userId, cb) {
    db.query(findUserByIdQuery, userId, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res[0]);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }

  static getAllUser(cb) {
    db.query(findAllUserQuery, (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }

  static uploadProfileImage(filename, userId, cb) {
    db.query(uploadProfileImageQuery, [filename, userId], (err, res) => {
      if (err) {
        logger.error(err.message);
        cb(err, null);
        return;
      }
      if (res.length) {
        cb(null, res[0]);
        return;
      }
      cb({ kind: "not_found" }, null);
    });
  }
}

module.exports = User;
