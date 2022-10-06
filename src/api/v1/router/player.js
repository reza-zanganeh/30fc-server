const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPlayerByAdmin,
  chnageTShirtNumber,
} = require("../controller/player")
const {
  createPlayerByAdminSchemaValidation,
  changeTShirtNumberSchemaValidation,
} = require("../validations/player")
const {
  hasAccessToAdminOperation,
  hasAccessToPlayer,
} = require("../middleware/accessControl/index")
const playerRouter = express.Router()

// TODO:
// add new player to team by admin

playerRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createPlayerByAdminSchemaValidation),
  expressValidationResultHandler,
  createPlayerByAdmin
)

playerRouter.patch(
  "/tshirt-number",
  checkSchema(changeTShirtNumberSchemaValidation),
  expressValidationResultHandler,
  hasAccessToPlayer,
  chnageTShirtNumber
)

module.exports.playerRouter = playerRouter
