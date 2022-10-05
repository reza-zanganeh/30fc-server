const express = require("express")
const { modelName } = require("../../../config/Constant")
const { energyProducerModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createEnergyProducerSchemaValidation,
  deleteEnergyProducerSchemaValidation,
  useEnergyProducerSchemaValidation,
} = require("../validations/energyProducer")
const {
  createController: createEnergyProducer,
  deleteController: deleteEnergyProducer,
  readController: getEnergyProducer,
} = require("../helpers/controllerCRUDoperation")(energyProducerModelName)
const { useEnergyProducer } = require("../controller/energyProducer")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl")
const energyProducerRouter = express.Router()

energyProducerRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createEnergyProducerSchemaValidation),
  expressValidationResultHandler,
  createEnergyProducer.bind(null, ["level", "price", "ability"])
)

energyProducerRouter.get("/", getEnergyProducer)

energyProducerRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deleteEnergyProducerSchemaValidation),
  expressValidationResultHandler,
  deleteEnergyProducer
)

energyProducerRouter.post(
  "/use",
  checkSchema(useEnergyProducerSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  useEnergyProducer
)

module.exports.energyProducerRouter = energyProducerRouter
