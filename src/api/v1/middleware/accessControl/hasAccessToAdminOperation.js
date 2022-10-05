const { Forbidden } = require("../../helpers/HttpResponse")
const { createError } = require("../../helpers/Functions")

module.exports.hasAccessToAdminOperation = (req, res, next) => {
  const { role } = req?.user
  if (role === "Admin") next()
  else return next(createError(Forbidden()))
}
