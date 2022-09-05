// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPrimitivePlayerNameSchemaValidation,
  updatePrimitivePlayerNameSchemaValidation,
} = require("../validations/primitivePlayerName")
const {
  createController: createPrimitivePlayerName,
  readController: readPrimitivePlayerName,
  updateConrtoller: updatePrimitivePlayerName,
  deleteController: deletePrimitivePlayerName,
} = require("../helpers/controllerCRUDoperation")({
  english: "reservedTeamName",
  persian: "نام اولیه بازیکن",
})
const primitivePlayerNameRouter = express.Router()

primitivePlayerNameRouter.post(
  "/",
  checkSchema(createPrimitivePlayerNameSchemaValidation),
  expressValidationResultHandler,
  createPrimitivePlayerName.bind(null, ["name"])
)
primitivePlayerNameRouter.get("/", readPrimitivePlayerName)
primitivePlayerNameRouter.patch(
  "/:id",
  checkSchema(updatePrimitivePlayerNameSchemaValidation),
  expressValidationResultHandler,
  updatePrimitivePlayerName.bind(null, ["name"])
)
primitivePlayerNameRouter.delete("/:id", deletePrimitivePlayerName)

module.exports.primitivePlayerNameRouter = primitivePlayerNameRouter
