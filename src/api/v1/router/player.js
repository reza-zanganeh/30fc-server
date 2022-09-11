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
const { isAdmin } = require("../middleware/isAdmin")
const { isMyTeam } = require("../middleware/isMyTeam")
const playerRouter = express.Router()

playerRouter.post(
  "/",
  isAdmin,
  checkSchema(createPlayerByAdminSchemaValidation),
  expressValidationResultHandler,
  createPlayerByAdmin
)

playerRouter.patch(
  "/tshirt-number",
  checkSchema(changeTShirtNumberSchemaValidation),
  expressValidationResultHandler,
  isMyTeam,
  chnageTShirtNumber
)

module.exports.playerRouter = playerRouter
