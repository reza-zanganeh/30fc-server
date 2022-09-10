// get information with token
const express = require("express")
const { modelName } = require("../../../config/Constant")
const { reservedTeamNameModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createReservedTeamNameSchemaValidation,
  updateReservedTeamNameSchemaValidation,
} = require("../validations/reservedTeamName")
const {
  createController: createReservedTeamName,
  readController: readReservedTeamName,
  updateConrtoller: updateReservedTeamName,
  deleteController: deleteReservedTeamName,
} = require("../helpers/controllerCRUDoperation")(reservedTeamNameModelName)
const reservedTeamNameRouter = express.Router()

reservedTeamNameRouter.post(
  "/",
  checkSchema(createReservedTeamNameSchemaValidation),
  expressValidationResultHandler,
  createReservedTeamName.bind(null, ["name"])
)
reservedTeamNameRouter.get("/", readReservedTeamName)
reservedTeamNameRouter.patch(
  "/:id",
  checkSchema(updateReservedTeamNameSchemaValidation),
  expressValidationResultHandler,
  updateReservedTeamName.bind(null, ["name"])
)
reservedTeamNameRouter.delete("/:id", deleteReservedTeamName)

module.exports.reservedTeamNameRouter = reservedTeamNameRouter
