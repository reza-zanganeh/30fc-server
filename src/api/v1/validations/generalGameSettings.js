const { required } = require("../helpers/inputValidation")

module.exports.updateGameConstantVariableSchemaValidation = {
  amount: required("مقدار ضریب", "body"),
}
