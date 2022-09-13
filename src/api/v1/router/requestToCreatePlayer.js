const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createRequestToCreatePlayer,
  confirmRequestToCreatePlayer,
  rejectRequestToCreatePlayer,
  reactivationRequestToCreatePlayer,
  deleteRequestToCreatePlayer,
  getRequestToCreatePlayer,
} = require("../controller/requestToCreatePlayer")
const {
  createRequestToCreatePlayerSchecmaValidation,
  confirmRequestToCreatePlayerSchecmaValidation,
  reactiveRequestToCreatePlayerSchecmaValidation,
  rejectRequestToCreatePlayerSchecmaValidation,
  deleteRequestToCreatePlayerSchecmaValidation,
} = require("../validations/requestToCreatePlayer")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl/index")
const requestToCreatePlayerRouter = express.Router()

requestToCreatePlayerRouter.get(
  "/admin",
  hasAccessToAdminOperation,
  getRequestToCreatePlayer
)

requestToCreatePlayerRouter.get("/", hasAccessToTeam, getRequestToCreatePlayer)

requestToCreatePlayerRouter.post(
  "/",
  checkSchema(createRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  createRequestToCreatePlayer
)

requestToCreatePlayerRouter.patch(
  "/confirm",
  hasAccessToAdminOperation,
  checkSchema(confirmRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  confirmRequestToCreatePlayer
)

requestToCreatePlayerRouter.patch(
  "/reject",
  hasAccessToAdminOperation,
  checkSchema(rejectRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  rejectRequestToCreatePlayer
)

requestToCreatePlayerRouter.patch(
  "/reactive",
  checkSchema(reactiveRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  reactivationRequestToCreatePlayer
)

requestToCreatePlayerRouter.delete(
  "/:id",
  checkSchema(deleteRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  deleteRequestToCreatePlayer
)

module.exports.requestToCreatePlayerRouter = requestToCreatePlayerRouter
