const { Forbidden } = require("../../helpers/HttpResponse")
const { createError } = require("../../helpers/Functions")

module.exports.hasAccessToAdminOperation = (req, res, next) => {
  const { level } = req?.user
  if (level === "LEVEL1") next()
  else return next(createError(Forbidden()))
}
