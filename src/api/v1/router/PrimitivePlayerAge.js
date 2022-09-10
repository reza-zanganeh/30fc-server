// get information with token
const express = require("express")
const { modelName } = require("../../../config/Constant")
const { primitivePlayerAgeModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPrimitivePlayerAgeSchemaValidation,
  checkAgesAverage,
} = require("../validations/PrimitivePlayerAge")
const {
  createController: createPrimitivePlayerAge,
  readController: readPrimitivePlayerAge,
  deleteController: deletePrimitivePlayerAge,
} = require("../helpers/controllerCRUDoperation")({
  primitivePlayerAgeModelName,
})
const primitivePlayerAgeRouter = express.Router()

primitivePlayerAgeRouter.post(
  "/",
  checkSchema(createPrimitivePlayerAgeSchemaValidation),
  expressValidationResultHandler,
  checkAgesAverage,
  createPrimitivePlayerAge.bind(null, [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
  ])
)
primitivePlayerAgeRouter.get("/", readPrimitivePlayerAge)

primitivePlayerAgeRouter.delete("/:id", deletePrimitivePlayerAge)

module.exports.primitivePlayerAgeRouter = primitivePlayerAgeRouter
