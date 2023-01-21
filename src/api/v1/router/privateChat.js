const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { modelName } = require("../../../config/Constant")
const { privateChatModelName } = modelName
const {
  sendMessageOnPrivateChat,
  startPrivateChat,
  getPrivateChatMessages,
  getPrivateChats,
  markAsReadMessages,
} = require("../controller/privateChat")
const { deleteController: deletePrivateChat } =
  require("../helpers/controllerCRUDoperation")(privateChatModelName)
const { hasAccessToTeam } = require("../middleware/accessControl")
const {
  accessToPrivateChat,
} = require("../middleware/chatAccessControl/privateChat")
const {
  startPrivateChatSchemaValidation,
  sendMessageOnPrivateChatSchemaValidation,
  markAsReadMessagesSchemaValidation,
} = require("../validations/privateChat")

const privateChatRouter = express.Router()

privateChatRouter.get("/", hasAccessToTeam, getPrivateChats)

privateChatRouter.get(
  "/messages",
  hasAccessToTeam,
  accessToPrivateChat,
  getPrivateChatMessages
)

privateChatRouter.post(
  "/read",
  hasAccessToTeam,
  accessToPrivateChat,
  checkSchema(markAsReadMessagesSchemaValidation),
  expressValidationResultHandler,
  markAsReadMessages
)

privateChatRouter.post(
  "/",
  hasAccessToTeam,
  checkSchema(startPrivateChatSchemaValidation),
  expressValidationResultHandler,
  startPrivateChat
)

privateChatRouter.post(
  "/send-message",
  hasAccessToTeam,
  accessToPrivateChat,
  checkSchema(sendMessageOnPrivateChatSchemaValidation),
  expressValidationResultHandler,
  sendMessageOnPrivateChat
)

privateChatRouter.delete(
  "/:id",
  hasAccessToTeam,
  accessToPrivateChat,
  deletePrivateChat
)

module.exports.privateChatRouter = privateChatRouter
