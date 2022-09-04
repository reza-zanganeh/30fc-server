// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createReservedTeamNameSchemaValidation,
  updateReservedTeamNameSchemaValidation,
  deleteReservedTeamNameSchemaValidation,
} = require("../validations/reservedTeamName")
const {
  createReservedTeamName,
  readReservedTeamName,
  updateReservedTeamName,
  deleteReservedTeamName,
} = require("../controller/reservedTeamName")
const reservedTeamNameRouter = express.Router()

reservedTeamNameRouter.post(
  "/",
  checkSchema(createReservedTeamNameSchemaValidation),
  expressValidationResultHandler,
  createReservedTeamName
)
reservedTeamNameRouter.get("/", readReservedTeamName)
reservedTeamNameRouter.patch(
  "/:id",
  checkSchema(updateReservedTeamNameSchemaValidation),
  expressValidationResultHandler,
  updateReservedTeamName
)
reservedTeamNameRouter.delete(
  "/:id",
  checkSchema(deleteReservedTeamNameSchemaValidation),
  deleteReservedTeamName
)

module.exports.reservedTeamNameRouter = reservedTeamNameRouter
