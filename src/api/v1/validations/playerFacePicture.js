const {
  fileSize,
  fileType,
  fileName,
  isBoolean,
} = require("../helpers/inputValidation")

module.exports.createPlayerFacePictureSchemaValidation = {
  fileSize: fileSize("body"),
  fileType: fileType("body"),
  fileName: fileName("body"),
  isSpecial: isBoolean("ایاتصویر رزرو شده", "body"),
}
