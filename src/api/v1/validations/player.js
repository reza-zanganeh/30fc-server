const { modelName } = require("../../../config/Constant")
const { playerPositionModelName } = modelName
const {
  required,
  between,
  fileName,
  fileSize,
  fileType,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
module.exports.createPlayerByAdminSchemaValidation = {
  name: required("نام بازیکن", "body"),
  fileSize: fileSize("body"),
  fileType: fileType("body"),
  fileName: fileName("body"),
  age: between("سن بازیکن", "body", 16, 38),
  positionId: checkExistsObjectWithIdInDb(playerPositionModelName, "body"),
  nationality: required("ملیت بازیکن", "body"),
  spead: required("سرعت بازیکن", "body"),
  controll: required("کنترل بازیکن", "body"),
  pass: required("پاس بازیکن", "body"),
  flexibility: required("انعطاف بازیکن", "body"),
  stamina: required("استقامت بازیکن", "body"),
  technique: required("تکنیک بازیکن", "body"),
  shoot: required("شوت بازیکن", "body"),
  drible: required("دریبل بازیکن", "body"),
  focus: required("تمرکز بازیکن", "body"),
  experience: required("تجربه بازیکن", "body"),
  tShirtNumber: required("شماره پیراهن بازیکن", "body"),
  price: required("قیمت بازیکن", "body"),
}

module.exports.changeTShirtNumberSchemaValidation = {
  teamId: required("شناسه تیم", "body"),
  playerId: required("شناسه بازیکن", "body"),
  tShirtNumber: required("شماره پیراهن بازیکن", "body"),
}
