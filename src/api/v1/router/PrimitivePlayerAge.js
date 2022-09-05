// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPrimitivePlayerAgeSchemaValidation,
} = require("../validations/PrimitivePlayerAge")
const {
  createController: createPrimitivePlayerAge,
  readController: readPrimitivePlayerAge,
  deleteController: deletePrimitivePlayerAge,
} = require("../helpers/controllerCRUDoperation")({
  english: "primitivePlayerAge",
  persian: "سن اولیه بازیکنان",
})
const primitivePlayerAgeRouter = express.Router()

primitivePlayerAgeRouter.post(
  "/",
  checkSchema(createPrimitivePlayerAgeSchemaValidation),
  expressValidationResultHandler,
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
