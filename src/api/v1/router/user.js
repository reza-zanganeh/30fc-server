// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { isAuthenticate } = require("../middleware/athentication")
const { getUserInformationWithToken } = require("../controller/user")
const userRouter = express.Router()

userRouter.get("/", isAuthenticate, getUserInformationWithToken)

module.exports.userRouter = userRouter
