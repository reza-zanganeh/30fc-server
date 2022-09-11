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
const { isAdmin } = require("../middleware/isAdmin")
const { isMyTeam } = require("../middleware/isMyTeam")
const { isMyTeamOrAdmin } = require("../middleware/isMyTeamOrAdmin")
const requestToCreatePlayerRouter = express.Router()

requestToCreatePlayerRouter.get(
  "/",
  isAdmin,
  isMyTeamOrAdmin,
  getRequestToCreatePlayer
)

requestToCreatePlayerRouter.post(
  "/",
  checkSchema(createRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  isMyTeam,
  createRequestToCreatePlayer
)

requestToCreatePlayerRouter.patch(
  "/confirm",
  isAdmin,
  checkSchema(confirmRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  confirmRequestToCreatePlayer
)

requestToCreatePlayerRouter.patch(
  "/reject",
  isAdmin,
  checkSchema(rejectRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  rejectRequestToCreatePlayer
)

requestToCreatePlayerRouter.patch(
  "/reactive",
  checkSchema(reactiveRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  isMyTeam,
  reactivationRequestToCreatePlayer
)

requestToCreatePlayerRouter.delete(
  "/:id",
  checkSchema(deleteRequestToCreatePlayerSchecmaValidation),
  expressValidationResultHandler,
  isMyTeam,
  deleteRequestToCreatePlayer
)

module.exports.requestToCreatePlayerRouter = requestToCreatePlayerRouter
