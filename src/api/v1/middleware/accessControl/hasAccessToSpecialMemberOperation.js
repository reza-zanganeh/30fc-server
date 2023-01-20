const { modelName } = require("../../../../config/Constant")
const { createError } = require("../../helpers/Functions")
const { Forbidden } = require("../../helpers/HttpResponse")
const { teamModelName } = modelName
module.exports.hasAccessToSpecialMemberOperation = (
  allowedMemberShipType = [],
  req,
  res,
  next
) => {
  const { teamMembershipType } = req[teamModelName.english]
  if (allowedMemberShipType.includes(teamMembershipType)) next()
  else return next(createError(Forbidden("ایجاد گروه")))
}
