const { required } = require("../helpers/inputValidation")
module.exports.createReservedTeamNameSchemaValidation = {
  name: required("اسم تیم رزرو شده", "body"),
}
module.exports.updateReservedTeamNameSchemaValidation = {
  id: required("ایدی اسم تیم رزرو شده", "params"),
  name: required("اسم جدید تیم رزرو شده", "body"),
}
module.exports.deleteReservedTeamNameSchemaValidation = {
  id: required("ایدی اسم تیم رزرو شده", "params"),
}
