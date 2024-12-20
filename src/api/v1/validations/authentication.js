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
  fullname: required("نام و نام خانوادگی", "body"),
  teamName: required("نام تیم", "body"),
  password: password("body"),
  confirmPassword: password("body"),
  otpCode: required("کد اعتبار سنجی", "body"),
}

module.exports.initialAdminValidationSchema = {
  fullname: required("نام و نام خانوادگی", "body"),
  password: password("body"),
  confirmPassword: password("body"),
  otpCode: required("کد اعتبار سنجی", "body"),
}

module.exports.loginValidationSchema = {
  password: password("body"),
}

module.exports.requestToResetPasswordValidationSchema = {
  email: email("body"),
}

module.exports.resetPasswordValidationSchema = {
  userId: required("شناسه کاربر", "params"),
  hash: required("کد هش بازیابی رمز عبور", "params"),
  newPassword: password("body"),
  confirmNewPassword: password("body"),
}
