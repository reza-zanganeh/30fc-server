const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const {
  requestOtp,
  register,
  login,
  requestToResetPassword,
  resetPassword,
} = require("../controller/authentication")
const {
  requestOtpValidationSchema,
  registerValidationSchema,
  loginValidationSchema,
  requestToResetPasswordValidationSchema,
  resetPasswordValidationSchema,
} = require("../validations/authentication")
const { isValidVerifyOtpToken } = require("../middleware/isValidVerifyOtpToken")
const authenticationRouter = express.Router()

authenticationRouter.post(
  "/request-otp",
  checkSchema(requestOtpValidationSchema),
  expressValidationResultHandler,
  requestOtp
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
