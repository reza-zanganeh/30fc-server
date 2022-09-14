const express = require("express")
const { modelName } = require("../../../config/Constant")
const { stadiumModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  buyStadiumSchemaValidation,
  createStadiumSchemaValidation,
  deleteStadiumSchemaValidation,
} = require("../validations/stadium")
const {
  createController: createStadium,
  deleteController: deleteStadium,
  getTeamAssetsWithPriceForUpgrade: getStadium,
  buyTeamAsset: buyStadium,
} = require("../helpers/controllerCRUDoperation")(stadiumModelName)

const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
  hasAccessToPlayWithApp,
  hasAccessToPlayer,
} = require("../middleware/accessControl")
const stadiumRouter = express.Router()

stadiumRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createStadiumSchemaValidation),
  expressValidationResultHandler,
  createStadium.bind(null, ["level", "price", "capacity"])
)

stadiumRouter.get("/admin", hasAccessToAdminOperation, getStadium)
stadiumRouter.get("/", hasAccessToPlayWithApp, hasAccessToTeam, getStadium)

stadiumRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deleteStadiumSchemaValidation),
  expressValidationResultHandler,
  deleteStadium
)

stadiumRouter.post(
  "/buy",
  hasAccessToPlayWithApp,
  checkSchema(buyStadiumSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  buyStadium
)

module.exports.stadiumRouter = stadiumRouter
