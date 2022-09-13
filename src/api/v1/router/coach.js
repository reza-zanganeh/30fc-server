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
const {
  createController: createCoach,
  deleteController: deleteCoach,
  getTeamAssetsWithPriceForUpgrade: getCoach,
  buyTeamAsset: buyCoach,
} = require("../helpers/controllerCRUDoperation")(coachModelName)
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
  hasAccessToPlayWithApp,
} = require("../middleware/accessControl")
const coachRouter = express.Router()

coachRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createCoachSchemaValidation),
  expressValidationResultHandler,
  createCoach.bind(null, ["level", "price", "ability"])
)

coachRouter.get("/admin", hasAccessToAdminOperation, getCoach)
coachRouter.get("/", hasAccessToPlayWithApp, hasAccessToTeam, getCoach)

coachRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deleteCoachSchemaValidation),
  expressValidationResultHandler,
  deleteCoach
)

coachRouter.post(
  "/buy",
  hasAccessToPlayWithApp,
  checkSchema(buyCoachSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  buyCoach
)

module.exports.coachRouter = coachRouter
