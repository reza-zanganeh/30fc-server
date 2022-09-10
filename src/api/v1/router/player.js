const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { createPlayerByAdmin } = require("../controller/player")
const { createPlayerByAdminSchemaValidation } = require("../validations/player")
const { isAdmin } = require("../middleware/isAdmin")
const playerRouter = express.Router()

playerRouter.post(
  "/",
  isAdmin,
  checkSchema(createPlayerByAdminSchemaValidation),
  expressValidationResultHandler,
  createPlayerByAdmin
)

module.exports.playerRouter = playerRouter
