const express = require("express")
const { modelName } = require("../../../config/Constant")
const { motivationalSentenceModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { hasAccessToAdminOperation } = require("../middleware/accessControl")
const {
  createOrUpdateMotivationalSentenceSchemaValidation,
  deleteMotivationSentenceSchemaValidation,
} = require("../validations/motivationalSentence")
const {
  createController: createMotivationalSentence,
  deleteController: deleteMotivationalSentence,
  updateConrtoller: updateMotivationalSentence,
} = require("../helpers/controllerCRUDoperation")(motivationalSentenceModelName)
const {
  getMotivationalSentence,
} = require("../controller/motivationalSentence")

const motivationalSentenceRouter = express.Router()

motivationalSentenceRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createOrUpdateMotivationalSentenceSchemaValidation),
  expressValidationResultHandler,
  createMotivationalSentence.bind(null, ["sentence", "author"])
)

motivationalSentenceRouter.patch(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createOrUpdateMotivationalSentenceSchemaValidation),
  expressValidationResultHandler,
  updateMotivationalSentence.bind(null, ["sentence", "author"])
)

motivationalSentenceRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deleteMotivationSentenceSchemaValidation),
  expressValidationResultHandler,
  deleteMotivationalSentence
)

motivationalSentenceRouter.get("/", getMotivationalSentence)

module.exports.motivationalSentenceRouter = motivationalSentenceRouter
