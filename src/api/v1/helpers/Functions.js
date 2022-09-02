const jwt = require("jsonwebtoken");
const projectConfig = require("../../../config/index");
module.exports.createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.createError = ({ statusCode, message }) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

module.exports.createJsonWebToken = (data, expiresIn) => {
  const token = jwt.sign(data, projectConfig.jsonwebtoken.tokenKey, {
    expiresIn: `${expiresIn}m`,
  });
  return token;
};
