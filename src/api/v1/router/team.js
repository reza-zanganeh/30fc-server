const express = require("express")
const { checkSchema } = require("express-validator")
const { modelName } = require("../../../config/Constant")
const { teamModelName } = modelName
const { expressValidationResultHandler } = require("../helpers/responseHandler")
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
const { isMyTeam } = require("../middleware/isMyTeam")
const { isMyTeamOrAdmin } = require("../middleware/isMyTeamOrAdmin")
const { readWithIdController: getTeam } =
  require("../helpers/controllerCRUDoperation")(teamModelName)

const teamRouter = express.Router()

teamRouter.get("/:id", isMyTeamOrAdmin, getTeam)

teamRouter.get("/:id/players", isMyTeamOrAdmin, getPlayers)

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
  isMyTeam,
  changeComposition
)

teamRouter.patch(
  "/change-two-player-position",
  checkSchema(changeTwoPlayerPositionSchemaValidation),
  expressValidationResultHandler,
  isMyTeam,
  changeTwoPlayerPosition
)

module.exports.teamRouter = teamRouter
