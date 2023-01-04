const {
  required,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { motivationalSentenceModelName } = modelName
module.exports.createOrUpdateMotivationalSentenceSchemaValidation = {
  sentence: required("جمله انگیزشی", "body"),
  author: required("نویسنده جمله انگیزشی", "body"),
}

module.exports.deleteMotivationSentenceSchemaValidation = {
  id: checkExistsObjectWithIdInDb(
    motivationalSentenceModelName,
    "params",
    false
  ),
}
