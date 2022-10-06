const express = require("express")
const { modelName } = require("../../../config/Constant")
const { gameConstantVariableModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  updateGameConstantVariableSchemaValidation,
} = require("../validations/generalGameSettings")
const { updateConrtoller: changeFactor } =
  require("../helpers/controllerCRUDoperation")(gameConstantVariableModelName)
const { updateRedisData } = require("../controller/generalGameSetting")
const generalGameSettingRouter = express.Router()

generalGameSettingRouter.patch("/update", updateRedisData)

generalGameSettingRouter.patch(
  "/game-constant-variable",
  checkSchema(updateGameConstantVariableSchemaValidation),
  expressValidationResultHandler,
  changeFactor.bind(null, ["amount"])
)

module.exports.generalGameSettingRouter = generalGameSettingRouter
