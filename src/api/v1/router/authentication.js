const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  requestToLoginOrRegister,
  register,
  login,
  requestToResetPassword,
  resetPassword,
  initialAdminUser,
} = require("../controller/authentication")
const {
  requestOtpValidationSchema,
  registerValidationSchema,
  loginValidationSchema,
  requestToResetPasswordValidationSchema,
  resetPasswordValidationSchema,
  initialAdminValidationSchema,
} = require("../validations/authentication")
const { isValidVerifyOtpToken } = require("../middleware/isValidVerifyOtpToken")
const { checkCaptcha } = require("../middleware/checkCaptcha")
const authenticationRouter = express.Router()

authenticationRouter.post(
  "/initial-admin",
  isValidVerifyOtpToken,
  checkSchema(initialAdminValidationSchema),
  expressValidationResultHandler,
  initialAdminUser
)

authenticationRouter.post(
  "/login-or-register",
  // TODO : unComment this line
  // checkCaptcha,
  checkSchema(requestOtpValidationSchema),
  expressValidationResultHandler,
  requestToLoginOrRegister
)

authenticationRouter.post(
  "/register",
  isValidVerifyOtpToken,
  checkSchema(registerValidationSchema),
  expressValidationResultHandler,
  register
)

authenticationRouter.post(
  "/login",
  isValidVerifyOtpToken,
  checkSchema(loginValidationSchema),
  expressValidationResultHandler,
  login
)

authenticationRouter.post(
  "/request-to-reset-password",
  checkSchema(requestToResetPasswordValidationSchema),
  expressValidationResultHandler,
  requestToResetPassword
)

authenticationRouter.post(
  "/reset-password/:userId/:hash",
  checkSchema(resetPasswordValidationSchema),
  expressValidationResultHandler,
  resetPassword
)

module.exports.authenticationRouter = authenticationRouter
