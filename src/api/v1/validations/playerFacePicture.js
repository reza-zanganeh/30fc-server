const {
  fileSize,
  fileType,
  fileName,
  required,
} = require("../helpers/inputValidation")

module.exports.createPlayerFacePictureSchemaValidation = {
  fileSize: fileSize("body"),
  fileType: fileType("body"),
  fileName: fileName("body"),
}

module.exports.deletePlayerFacePictureSchemaValidation = {
  id: required("شناسه تصویر چهره بازیکن", "params"),
}
