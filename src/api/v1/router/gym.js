const express = require("express")
const { modelName } = require("../../../config/Constant")
const { gymModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { createGymSchemaValidation } = require("../validations/gym")
const { isAdmin } = require("../middleware/isAdmin")
const {
  createController: createGym,
  readController: getGym,
  deleteController: deleteGym,
} = require("../helpers/controllerCRUDoperation")(gymModelName)

const gymRouter = express.Router()

gymRouter.post(
  "/",
  isAdmin,
  checkSchema(createGymSchemaValidation),
  expressValidationResultHandler,
  createGym.bind(null, ["level", "price", "capacity"])
)

gymRouter.get("/", getGym)

gymRouter.delete("/:id", isAdmin, deleteGym)

module.exports.gymRouter = gymRouter
