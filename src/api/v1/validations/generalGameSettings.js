const { required } = require("../helpers/inputValidation")

module.exports.updateGameFactorSchemaValidation = {
  amount: required("مقدار ضریب", "body"),
}
