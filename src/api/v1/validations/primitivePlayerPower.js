const { required } = require("../helpers/inputValidation")
module.exports.createPrimitivePlayerPowerSchemaValidation = {
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
}
