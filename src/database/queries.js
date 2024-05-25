const { DB_NAME } = require("../utility/secrets");

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image TEXT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, ?, NOW())`;
const updateUserById = `UPDATE users set first_name = ?, last_name = ?, gender = ?, dob = ?, email = ? where id = ?`;
const uploadProfileImage = `UPDATE users set profile_image = ? where id = ?`;

const findUserByEmail = `SELECT * FROM users WHERE email = ?`;
const findUserById = `SELECT * FROM users WHERE id = ?`;
const deleteByUserId = `DELETE FROM users where id = ?`;
const findAllUser = `SELECT * FROM users`;

module.exports = {
  createDB,
  dropDB,
  createTableUSers,
  createNewUser,
  findUserByEmail,
  findUserById,
  updateUserById,
  deleteByUserId,
  findAllUser,
  uploadProfileImage,
};
