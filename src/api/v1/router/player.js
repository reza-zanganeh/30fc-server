const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {} = require("../controller/player")
const {} = require("../validations/player")

const playerRouter = express.Router()

module.exports.playerRouter = playerRouter
