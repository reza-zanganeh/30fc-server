// get information with token
const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  getUserInformationWithToken,
  blockUser,
  unBlockUser,
} = require("../controller/user")
const { blockAndUnBlockUserSchemaValidation } = require("../validations/user")
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

module.exports.userRouter = userRouter
