const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : null;

  if (!token) {
    return res.status(200).send({ message: "Authorization required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch(err) {
    console.error(err);
    return res.status(200).send({ message: "Invalid token" });
  }
};

module.exports = auth;