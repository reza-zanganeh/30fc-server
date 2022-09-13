const express = require("express")
const { checkSchema } = require("express-validator")
const { modelName } = require("../../../config/Constant")
const { teamModelName } = modelName
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl/index")
const {
  createTeamSchemaValidation,
  changeCompositionSchemaValidation,
  changeTwoPlayerPositionSchemaValidation,
} = require("../validations/team")
const {
  createTeam,
  getPlayers,
  changeComposition,
  changeTwoPlayerPosition,
} = require("../controller/team")
const { readWithIdController: getTeam } =
  require("../helpers/controllerCRUDoperation")(teamModelName)

const teamRouter = express.Router()

teamRouter.get("/:id", hasAccessToTeam, getTeam)
teamRouter.get("/admin/:id", hasAccessToAdminOperation, getTeam)

teamRouter.get("/:id/players", hasAccessToTeam, getPlayers)
teamRouter.get("/admin/:id/players", hasAccessToAdminOperation, getPlayers)

teamRouter.post(
  "/",
  checkSchema(createTeamSchemaValidation),
  expressValidationResultHandler,
  createTeam
)

teamRouter.patch(
  "/composition",
  checkSchema(changeCompositionSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  changeComposition
)

teamRouter.patch(
  "/change-two-player-position",
  checkSchema(changeTwoPlayerPositionSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  changeTwoPlayerPosition
)

module.exports.teamRouter = teamRouter
