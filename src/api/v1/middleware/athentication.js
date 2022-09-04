const jwt = require("jsonwebtoken")
const projectConfig = require("../../../config/index")
const { Unauthorized } = require("../helpers/HttpResponse")
const { createError } = require("../helpers/Functions")

module.exports.isAuthenticate = async (req, res, next) => {
  const token = req.headers?.token
  try {
    const user = jwt.verify(token, projectConfig.jsonwebtoken.tokenKey)
    req.user = user
    next()
  } catch (error) {
    next(createError(Unauthorized()))
  }
}
