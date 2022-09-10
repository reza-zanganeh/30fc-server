const express = require("express")
const { checkSchema } = require("express-validator")
const { modelName } = require("../../../config/Constant")
const { teamModelName } = modelName
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { createTeamSchemaValidation } = require("../validations/team")
const { createTeam, getPlayers } = require("../controller/team")
const { isMyTeam } = require("../middleware/isMyTeam")
const { readWithIdController: getTeam } =
  require("../helpers/controllerCRUDoperation")(teamModelName)

const teamRouter = express.Router()

teamRouter.get("/:id", isMyTeam, getTeam)

teamRouter.get("/:id/players", isMyTeam, getPlayers)

teamRouter.post(
  "/",
  checkSchema(createTeamSchemaValidation),
  expressValidationResultHandler,
  createTeam
)

module.exports.teamRouter = teamRouter
