const { required } = require("../helpers/inputValidation")
module.exports.createGymSchemaValidation = {
  level: required("سطح باشگاه", "body"),
  price: required("هزینه اجاره باشگاه", "body"),
  capacity: required("ظرفیت باشگاه", "body"),
}
