// get information with token
const express = require("express")
const { modelName } = require("../../../config/Constant")
const { playerFacePictureModelName } = modelName
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPlayerFacePictureSchemaValidation,
} = require("../validations/playerFacePicture")
const {
  createPlayerFacePicture,
  readPlayerFacePicture,
} = require("../controller/playerFacePicture")

const { deleteController: deletePlayerFacePicture } =
  require("../helpers/controllerCRUDoperation")(playerFacePictureModelName)

const playerFacePictureRouter = express.Router()

playerFacePictureRouter.post(
  "/",
  checkSchema(createPlayerFacePictureSchemaValidation),
  expressValidationResultHandler,
  createPlayerFacePicture
)
playerFacePictureRouter.get("/", readPlayerFacePicture)

playerFacePictureRouter.delete("/:id", deletePlayerFacePicture)

module.exports.playerFacePictureRouter = playerFacePictureRouter
