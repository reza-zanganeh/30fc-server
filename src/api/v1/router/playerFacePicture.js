// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPlayerFacePictureSchemaValidation,
  deletePlayerFacePictureSchemaValidation,
} = require("../validations/playerFacePicture")
const {
  createPlayerFacePicture,
  readPlayerFacePicture,
  deletePlayerFacePicture,
} = require("../controller/playerFacePicture")
const playerFacePictureRouter = express.Router()

playerFacePictureRouter.post(
  "/",
  checkSchema(createPlayerFacePictureSchemaValidation),
  expressValidationResultHandler,
  createPlayerFacePicture
)
playerFacePictureRouter.get("/", readPlayerFacePicture)

playerFacePictureRouter.delete(
  "/:id",
  checkSchema(deletePlayerFacePictureSchemaValidation),
  deletePlayerFacePicture
)

module.exports.playerFacePictureRouter = playerFacePictureRouter
