require("dotenv/config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers["authorization"] || req.query.token || req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
