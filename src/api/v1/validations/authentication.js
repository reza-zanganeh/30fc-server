const {
  email,
  password,
  required,
  phonenumber,
} = require("../helpers/inputValidation")
module.exports.requestOtpValidationSchema = {
  phonenumber: phonenumber("body"),
}

module.exports.registerValidationSchema = {
  phonenumber: phonenumber("body"),
  email: email("body"),
  fullname: required("نام و نام خانوادگی", "body"),
  password: password("body"),
  otpCode: required("کد اعتبار سنجی", "body"),
}

module.exports.loginValidationSchema = {
  email: email("body"),
  password: password("body"),
}

module.exports.requestToResetPasswordValidationSchema = {
  email: email("body"),
}

module.exports.resetPasswordValidationSchema = {
  userId: required("ایدی کاربر", "params"),
  hash: required("کد هش بازیابی رمز عبور", "params"),
  newPassword: password("body"),
  confirmNewPassword: password("body"),
}
