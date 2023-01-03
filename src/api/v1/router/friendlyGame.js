const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  acceptFriendlyGameRequest,
  getMyFriendlyRequestGame,
  disallowRequstFriendlyGame,
  allowRequestFriendlyGame,
  rejectFriendlyGameRequest,
  requestFriendlyGame,
} = require("../controller/friendlyGame")
const {
  requestFriendlyGameSchemaValidation,
  requiredRequestId,
} = require("../validations/friendlyGame")
const { hasAccessToTeam } = require("../middleware/accessControl")

const friendlyGameRouter = express.Router()

friendlyGameRouter.post(
  "/",
  hasAccessToTeam,
  checkSchema(requestFriendlyGameSchemaValidation),
  expressValidationResultHandler,
  requestFriendlyGame
)

friendlyGameRouter.get("/", hasAccessToTeam, getMyFriendlyRequestGame)

friendlyGameRouter.post(
  "/accept",
  hasAccessToTeam,
  checkSchema(requiredRequestId),
  expressValidationResultHandler,
  acceptFriendlyGameRequest
)

friendlyGameRouter.post(
  "/reject",
  hasAccessToTeam,
  checkSchema(requiredRequestId),
  expressValidationResultHandler,
  rejectFriendlyGameRequest
)

friendlyGameRouter.post("disallow", hasAccessToTeam, disallowRequstFriendlyGame)
friendlyGameRouter.post("disallow", hasAccessToTeam, allowRequestFriendlyGame)

module.exports.friendlyGameRouter = friendlyGameRouter
