const { required } = require("../helpers/inputValidation")
module.exports.createPrimitivePlayerNameSchemaValidation = {
  name: required("نام اولیه بازیکن", "body"),
}
module.exports.updatePrimitivePlayerNameSchemaValidation = {
  id: required("شناسه نام اولیه بازیکن", "params"),
  name: required("نام جدید بازیکن", "body"),
}
