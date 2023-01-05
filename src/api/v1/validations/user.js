const {
  checkExistsObjectWithIdInDb,
  inArray,
  stringLengthBetween,
  isBirthday,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { userModelName } = modelName
module.exports.blockAndUnBlockUserSchemaValidation = {
  userId: checkExistsObjectWithIdInDb(userModelName, "body", true, {
    fullname: true,
    isBlock: true,
  }),
}

// TODO : validate birthday
module.exports.completionInformationSchemaValidation = {
  gender: inArray("جنسیت", "body", ["Male", "Female"]),
  birthday: isBirthday("تاریخ تولد", "body"),
  country: stringLengthBetween("کشور", "body", 4, 50),
  state: stringLengthBetween("استان", "body", 4, 50),
  city: stringLengthBetween("شهر", "body", 4, 50),
}
