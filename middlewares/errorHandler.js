const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: "Duplicate field value" });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(UNAUTHORIZED).send({ message: "Token expired" });
  }

  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
};

module.exports = errorHandler;