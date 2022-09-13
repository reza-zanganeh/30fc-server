const express = require("express")
const { modelName } = require("../../../config/Constant")
const { coinPlanModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { createCoinPlanSchemaValidation } = require("../validations/coinPlan")
const {
  hasAccessToAdminOperation,
  hasAccessToPlayWithApp,
} = require("../middleware/accessControl")
const {
  createController: createCoinPlan,
  readController: getCoinPlan,
  deleteController: deleteCoinPlan,
} = require("../helpers/controllerCRUDoperation")(coinPlanModelName)

const coinPlanRouter = express.Router()

coinPlanRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createCoinPlanSchemaValidation),
  expressValidationResultHandler,
  createCoinPlan.bind(null, ["amount", "price", "discountInPercent"])
)

coinPlanRouter.get("/", hasAccessToPlayWithApp, getCoinPlan)

coinPlanRouter.delete("/:id", hasAccessToAdminOperation, deleteCoinPlan)

module.exports.coinPlanRouter = coinPlanRouter
