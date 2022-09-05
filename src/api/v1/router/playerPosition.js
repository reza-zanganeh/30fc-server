// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  createPlayerPositionSchemaValidation,
} = require("../validations/playerPosition")
const {
  createController: createplayerPosition,
  readController: readplayerPosition,
  deleteController: deleteplayerPosition,
} = require("../helpers/controllerCRUDoperation")({
  english: "playerPosition",
  persian: "موقعیت بازیکن",
})
const playerPositionRouter = express.Router()

playerPositionRouter.post(
  "/",
  checkSchema(createPlayerPositionSchemaValidation),
  expressValidationResultHandler,
  createplayerPosition.bind(null, ["major", "manor"])
)
playerPositionRouter.get("/", readplayerPosition)
playerPositionRouter.delete("/:id", deleteplayerPosition)
module.exports.playerPositionRouter = playerPositionRouter
