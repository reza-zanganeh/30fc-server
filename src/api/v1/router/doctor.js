const express = require("express")
const { modelName } = require("../../../config/Constant")
const { doctorModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  buyDoctorSchemaValidation,
  createDoctorSchemaValidation,
  deleteDoctorSchemaValidation,
  useDoctorSchemaValidation,
} = require("../validations/doctor")
const {
  createController: createDoctor,
  deleteController: deleteDoctor,
  getTeamAssetsWithPriceForUpgrade: getDoctor,
  buyTeamAsset: buyDoctor,
} = require("../helpers/controllerCRUDoperation")(doctorModelName)
const { useDoctor } = require("../controller/doctor")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
  hasAccessToPlayWithApp,
} = require("../middleware/accessControl")
const doctorRouter = express.Router()

doctorRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createDoctorSchemaValidation),
  expressValidationResultHandler,
  createDoctor.bind(null, ["level", "price", "ability"])
)

doctorRouter.get("/admin", hasAccessToAdminOperation, getDoctor)
doctorRouter.get("/", hasAccessToPlayWithApp, hasAccessToTeam, getDoctor)

doctorRouter.delete(
  "/:id",
  hasAccessToAdminOperation,
  checkSchema(deleteDoctorSchemaValidation),
  expressValidationResultHandler,
  deleteDoctor
)

doctorRouter.post(
  "/buy",
  hasAccessToPlayWithApp,
  checkSchema(buyDoctorSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  buyDoctor
)

doctorRouter.post(
  "/use",
  hasAccessToPlayWithApp,
  checkSchema(useDoctorSchemaValidation),
  expressValidationResultHandler,
  hasAccessToTeam,
  useDoctor
)

module.exports.doctorRouter = doctorRouter
