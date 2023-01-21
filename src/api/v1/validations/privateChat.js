const {
  checkExistsObjectWithIdInDb,
  required,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { teamModelName } = modelName

module.exports.startPrivateChatSchemaValidation = {
  teamTwoId: checkExistsObjectWithIdInDb(teamModelName, "body", false),
}

module.exports.sendMessageOnPrivateChatSchemaValidation = {
  message: required("متن پیام", "body"),
}

module.exports.markAsReadMessagesSchemaValidation = {
  messageIds: required("شناسه پیام ها", "body"),
}
