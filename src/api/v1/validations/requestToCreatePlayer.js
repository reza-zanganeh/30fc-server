const {
  required,
  fileSize,
  fileType,
  fileName,
  between,
  checkExistsObjectWithIdInDb,
  inArray,
} = require("../helpers/inputValidation")
const { createError } = require("../helpers/Functions")
const { BadRequest, InternalServerError } = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { playerPositionModelName, requestToCreatePlayerModelName } = modelName
const { readOne } = require("../helpers/prisma")

module.exports.createRequestToCreatePlayerSchecmaValidation = {
  teamId: required("شناسه تیم", "body"),
  name: required("نام تیم", "body"),
  fileSize: fileSize("body"),
  fileType: fileType("body"),
  fileName: fileName("body"),
  age: between("سن بازیکن", "body", 16, 38),
  positionId: checkExistsObjectWithIdInDb(playerPositionModelName, "body"),
  nationality: required("ملیت بازیکن", "body"),
  tShirtNumber: required("شماره پیراهن بازیکن", "body"),
  spead: between("سرعت بازیکن", "body", 0, 300),
  controll: between("قدرت کنترل بازیکن", "body", 0, 300),
  pass: between("دقت پاس بازیکن", "body", 0, 300),
  flexibility: between("انعطاف بازیکن", "body", 0, 300),
  stamina: between("استقامت بازیکن", "body", 0, 300),
  technique: between("تکنیک بازیکن", "body", 0, 300),
  shoot: between("قدرت شوت بازیکن", "body", 0, 300),
  drible: between("دریبل بازیکن", "body", 0, 300),
  focus: between("تمرکز بازیکن", "body", 0, 300),
  experience: between("تجربه بازیکن", "body", 0, 300),
}

module.exports.confirmRequestToCreatePlayerSchecmaValidation = {
  requestId: checkExistsObjectWithIdInDb(
    requestToCreatePlayerModelName,
    "body",
    true,
    { status: true }
  ),
  adminResponse: required("پاسخ ادمین", "body"),
}

module.exports.rejectRequestToCreatePlayerSchecmaValidation = {
  requestId: checkExistsObjectWithIdInDb(
    requestToCreatePlayerModelName,
    "body",
    true,
    { status: true }
  ),
  adminResponse: required("پاسخ ادمین", "body"),
}

module.exports.reactiveRequestToCreatePlayerSchecmaValidation = {
  teamId: required("شناسه تیم", "body"),
  requestId: checkExistsObjectWithIdInDb(
    requestToCreatePlayerModelName,
    "body",
    true,
    { status: true, teamId: true }
  ),
}

module.exports.deleteRequestToCreatePlayerSchecmaValidation = {
  teamId: required("شناسه تیم", "body"),
  id: checkExistsObjectWithIdInDb(
    requestToCreatePlayerModelName,
    "params",
    true,
    { status: true, teamId: true, playerId: true }
  ),
}
