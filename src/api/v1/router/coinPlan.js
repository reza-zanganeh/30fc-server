const express = require("express")
const { modelName } = require("../../../config/Constant")
const { coinPlanModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { createCoinPlanSchemaValidation } = require("../validations/coinPlan")
const { isAdmin } = require("../middleware/isAdmin")
const {
  createController: createCoinPlan,
  readController: getCoinPlan,
  deleteController: deleteCoinPlan,
} = require("../helpers/controllerCRUDoperation")(coinPlanModelName)

const coinPlanRouter = express.Router()

coinPlanRouter.post(
  "/",
  isAdmin,
  checkSchema(createCoinPlanSchemaValidation),
  expressValidationResultHandler,
  createCoinPlan.bind(null, ["amount", "price", "discountInPercent"])
)

coinPlanRouter.get("/", getCoinPlan)

coinPlanRouter.delete("/:id", isAdmin, deleteCoinPlan)

module.exports.coinPlanRouter = coinPlanRouter
