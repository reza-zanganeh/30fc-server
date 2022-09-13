const express = require("express")
const { modelName } = require("../../../config/Constant")
const { coachModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  buyCoachSchemaValidation,
  createCoachSchemaValidation,
  deleteCoachSchemaValidation,
} = require("../validations/coach")
const { isAdmin } = require("../middleware/isAdmin")
const { isMyTeam } = require("../middleware/isMyTeam")
const { isMyTeamOrAdmin } = require("../middleware/isMyTeamOrAdmin")
const { createController: createCoach, deleteController: deleteCoach } =
  require("../helpers/controllerCRUDoperation")(coachModelName)
const { buyCoach, getCoach } = require("../controller/coach")
const coachRouter = express.Router()

coachRouter.post(
  "/",
  isAdmin,
  checkSchema(createCoachSchemaValidation),
  expressValidationResultHandler,
  createCoach.bind(null, ["level", "price", "ability"])
)

coachRouter.get("/", isMyTeamOrAdmin, getCoach)

coachRouter.delete(
  "/:id",
  isAdmin,
  checkSchema(deleteCoachSchemaValidation),
  expressValidationResultHandler,
  deleteCoach
)

coachRouter.post(
  "/buy",
  checkSchema(buyCoachSchemaValidation),
  expressValidationResultHandler,
  isMyTeam,
  buyCoach
)

module.exports.coachRouter = coachRouter
