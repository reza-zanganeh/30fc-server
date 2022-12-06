const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createGoldenCupByAdmin,
  registerAtGoldenCup,
  startGoldenCupByAdmin,
} = require("../controller/goldenCup")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl")
const goldenCupRouter = express.Router()
const {
  createGoldenCupByAdminSchemaValidation,
  goldenCupIdRequierd,
} = require("../validations/goldenCup")

goldenCupRouter.post(
  "/",
  hasAccessToAdminOperation,
  checkSchema(createGoldenCupByAdminSchemaValidation),
  expressValidationResultHandler,
  createGoldenCupByAdmin
)

goldenCupRouter.post(
  "/register",
  hasAccessToTeam,
  checkSchema(goldenCupIdRequierd),
  expressValidationResultHandler,
  registerAtGoldenCup
)

goldenCupRouter.patch(
  "/start:/id",
  hasAccessToAdminOperation,
  checkSchema(goldenCupIdRequierd),
  expressValidationResultHandler,
  startGoldenCupByAdmin
)

module.exports.goldenCupRouter = goldenCupRouter
