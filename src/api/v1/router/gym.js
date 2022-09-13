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
const { isAdmin } = require("../middleware/isAdmin")
const { isMyTeam } = require("../middleware/isMyTeam")
const { isMyTeamOrAdmin } = require("../middleware/isMyTeamOrAdmin")
const { createController: createGym, deleteController: deleteGym } =
  require("../helpers/controllerCRUDoperation")(gymModelName)
const { buyGym, getGym, useGym } = require("../controller/gym")
const gymRouter = express.Router()

gymRouter.post(
  "/",
  isAdmin,
  checkSchema(createGymSchemaValidation),
  expressValidationResultHandler,
  createGym.bind(null, ["level", "price", "capacity"])
)

gymRouter.get("/", isMyTeamOrAdmin, getGym)

gymRouter.delete(
  "/:id",
  isAdmin,
  checkSchema(deleteGymSchemaValidation),
  expressValidationResultHandler,
  deleteGym
)

gymRouter.post(
  "/buy",
  checkSchema(buyGymSchemaValidation),
  expressValidationResultHandler,
  isMyTeam,
  buyGym
)

gymRouter.post(
  "/use",
  checkSchema(useGymSchemaValidation),
  expressValidationResultHandler,
  isMyTeam,
  useGym
)

module.exports.gymRouter = gymRouter
