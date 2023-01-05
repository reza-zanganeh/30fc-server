// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  getUserInformationWithToken,
  blockUser,
  unBlockUser,
  completionInformation,
  getInviteCode,
} = require("../controller/user")
const {
  blockAndUnBlockUserSchemaValidation,
  completionInformationSchemaValidation,
} = require("../validations/user")
const { hasAccessToAdminOperation } = require("../middleware/accessControl")
const userRouter = express.Router()

userRouter.get("/", getUserInformationWithToken)

userRouter.patch(
  "/admin/block",
  hasAccessToAdminOperation,
  checkSchema(blockAndUnBlockUserSchemaValidation),
  expressValidationResultHandler,
  blockUser
)
userRouter.patch(
  "/admin/un-block",
  hasAccessToAdminOperation,
  checkSchema(blockAndUnBlockUserSchemaValidation),
  expressValidationResultHandler,
  unBlockUser
)

userRouter.patch(
  "/completion-information",
  checkSchema(completionInformationSchemaValidation),
  expressValidationResultHandler,
  completionInformation
)

module.exports.userRouter = userRouter
