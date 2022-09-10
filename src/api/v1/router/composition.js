// get information with token
const express = require("express")
const { modelName } = require("../../../config/Constant")
const { compositionModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createCompositionSchemaValidation,
} = require("../validations/composition")
const { createComposition } = require("../controller/composition")
const { deleteController: deleteComposition, readController: readComposition } =
  require("../helpers/controllerCRUDoperation")(compositionModelName)
const compositionRouter = express.Router()

compositionRouter.post(
  "/",
  checkSchema(createCompositionSchemaValidation),
  expressValidationResultHandler,
  createComposition
)
compositionRouter.get("/", readComposition)

compositionRouter.delete("/:id", deleteComposition)

module.exports.compositionRouter = compositionRouter
