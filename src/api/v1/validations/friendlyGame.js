const {
  required,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { requestFriendlyGameModelName } = modelName

module.exports.requestFriendlyGameSchemaValidation = {
  receiverTeamId: required("شناسه تیم حریف", "body"),
}

module.exports.requiredRequestId = {
  requestId: checkExistsObjectWithIdInDb(
    requestFriendlyGameModelName,
    "body",
    true,
    { senderTeamId: true, receiverTeamId: true, status: true }
  ),
}
