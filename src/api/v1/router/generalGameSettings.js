const express = require("express")
const { modelName } = require("../../../config/Constant")
const { gameFactorModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { hasAccessToAdminOperation } = require("../middleware/accessControl")
const {
  updateGameFactorSchemaValidation,
} = require("../validations/generalGameSettings")
const { updateConrtoller: changeFactor } =
  require("../helpers/controllerCRUDoperation")(gameFactorModelName)
const { updateRedisData } = require("../controller/generalGameSetting")
const generalGameSettingRouter = express.Router()

generalGameSettingRouter.patch("/update", updateRedisData)

generalGameSettingRouter.patch(
  "/game-factor",
  checkSchema(updateGameFactorSchemaValidation),
  expressValidationResultHandler,
  changeFactor.bind(null, ["amount"])
)

module.exports.generalGameSettingRouter = generalGameSettingRouter
