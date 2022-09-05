const { required } = require("../helpers/inputValidation")
module.exports.createPlayerPositionSchemaValidation = {
  major: required("موقعیت اصلی بازیکن", "body"),
  manor: required("موقعیت جزیی بازیکن", "body"),
}
