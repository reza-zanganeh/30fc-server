const express = require("express")
const { modelName } = require("../../../config/Constant")
const { psychologistModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  buyPsychologisSchemaValidation,
  createPsychologisSchemaValidation,
  deletePsychologisSchemaValidation,
  usePsychologisSchemaValidation,
} = require("../validations/psychologist")
const {
  createController: createPsychologist,
  deleteController: deletePsychologist,
  getTeamAssetsWithPriceForUpgrade: getPsychologist,
  buyTeamAsset: buyPsychologist,
} = require("../helpers/controllerCRUDoperation")(psychologistModelName)
const { usePsychologist } = require("../controller/psychologist")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl")
const psychologistRouter = express.Router()

psychologistRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createPsychologisSchemaValidation),
  expressValidationResultHandler,
  createPsychologist.bind(null, ["level", "price", "ability"])
)

psychologistRouter.get("/admin", hasAccessToAdminOperation, getPsychologist)
psychologistRouter.get("/", hasAccessToTeam, getPsychologist)

psychologistRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deletePsychologisSchemaValidation),
  expressValidationResultHandler,
  deletePsychologist
)

psychologistRouter.post(
  "/buy",
  checkSchema(buyPsychologisSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  buyPsychologist
)

psychologistRouter.post(
  "/use",
  checkSchema(usePsychologisSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  usePsychologist
)

module.exports.psychologistRouter = psychologistRouter
