// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createCompositionSchemaValidation,
  deleteCompositionSchemaValidation,
} = require("../validations/composition")
const {
  createComposition,
  deleteComposition,
  readComposition,
} = require("../controller/composition")
const compositionRouter = express.Router()

compositionRouter.post(
  "/",
  checkSchema(createCompositionSchemaValidation),
  expressValidationResultHandler,
  createComposition
)
compositionRouter.get("/", readComposition)

compositionRouter.delete(
  "/:id",
  checkSchema(deleteCompositionSchemaValidation),
  expressValidationResultHandler,
  deleteComposition
)

module.exports.compositionRouter = compositionRouter
