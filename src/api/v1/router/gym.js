const express = require("express")
const { modelName } = require("../../../config/Constant")
const { gymModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createGymSchemaValidation,
  buyGymSchemaValidation,
  deleteGymSchemaValidation,
  useGymSchemaValidation,
} = require("../validations/gym")
const { createController: createGym, deleteController: deleteGym } =
  require("../helpers/controllerCRUDoperation")(gymModelName)
const { buyGym, getGym, useGym } = require("../controller/gym")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
  hasAccessToPlayWithApp,
  hasAccessToPlayer,
} = require("../middleware/accessControl")
const gymRouter = express.Router()

gymRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createGymSchemaValidation),
  expressValidationResultHandler,
  createGym.bind(null, ["level", "price", "capacity"])
)

gymRouter.get("/admin", hasAccessToAdminOperation, getGym)
gymRouter.get("/", hasAccessToPlayWithApp, hasAccessToTeam, getGym)

gymRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deleteGymSchemaValidation),
  expressValidationResultHandler,
  deleteGym
)

gymRouter.post(
  "/buy",
  hasAccessToPlayWithApp,
  checkSchema(buyGymSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  buyGym
)

gymRouter.post(
  "/use",
  hasAccessToPlayWithApp,
  checkSchema(useGymSchemaValidation),
  expressValidationResultHandler,
  hasAccessToPlayer,
  useGym
)

module.exports.gymRouter = gymRouter
