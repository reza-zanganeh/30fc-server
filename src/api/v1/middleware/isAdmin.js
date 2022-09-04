const { Forbidden } = require("../helpers/HttpResponse")
const { createError } = require("../helpers/Functions")

module.exports.isAdmin = (req, res, next) => {
  const { level } = req?.user
  const isAdmin = Boolean(level === "LEVEL1")
  if (isAdmin) next()
  else return next(createError(Forbidden()))
}
