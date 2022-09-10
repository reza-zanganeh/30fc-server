// get information with token
const express = require("express")
const { modelName } = require("../../../config/Constant")
const { primitivePlayerPowerModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPrimitivePlayerPowerSchemaValidation,
} = require("../validations/primitivePlayerPower")
const {
  createController: createPrimitivePlayerPower,
  readController: readPrimitivePlayerPower,
  deleteController: deletePrimitivePlayerPower,
} = require("../helpers/controllerCRUDoperation")(primitivePlayerPowerModelName)
const primitivePlayerPowerRouter = express.Router()

primitivePlayerPowerRouter.post(
  "/",
  checkSchema(createPrimitivePlayerPowerSchemaValidation),
  expressValidationResultHandler,
  createPrimitivePlayerPower.bind(null, [
    "spead",
    "controll",
    "pass",
    "flexibility",
    "stamina",
    "technique",
    "shoot",
    "drible",
    "focus",
    "experience",
  ])
)
primitivePlayerPowerRouter.get("/", readPrimitivePlayerPower)
primitivePlayerPowerRouter.delete("/:id", deletePrimitivePlayerPower)
module.exports.primitivePlayerPowerRouter = primitivePlayerPowerRouter
