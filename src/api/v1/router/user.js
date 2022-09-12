// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { isAdmin } = require("../middleware/isAdmin")
const {
  getUserInformationWithToken,
  blockUser,
  unBlockUser,
} = require("../controller/user")
const { blockAndUnBlockUserSchemaValidation } = require("../validations/user")
const userRouter = express.Router()

userRouter.get("/", getUserInformationWithToken)

userRouter.patch(
  "/block",
  isAdmin,
  checkSchema(blockAndUnBlockUserSchemaValidation),
  expressValidationResultHandler,
  blockUser
)
userRouter.patch(
  "/un-block",
  isAdmin,
  checkSchema(blockAndUnBlockUserSchemaValidation),
  expressValidationResultHandler,
  unBlockUser
)

module.exports.userRouter = userRouter
