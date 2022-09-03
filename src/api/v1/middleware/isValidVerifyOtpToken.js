const jwt = require("jsonwebtoken")
const projectConfig = require("../../../config/index")
const { createError } = require("../helpers/Functions")
const { BadRequest } = require("../helpers/HttpResponse")
module.exports.isValidVerifyOtpToken = async (req, res, next) => {
  const token = req.headers?.token
  try {
    const { phonenumber } = jwt.verify(
      token,
      projectConfig.jsonwebtoken.tokenKey
    )
    req.body.phonenumber = phonenumber
    next()
  } catch (error) {
    return next(
      createError(
        BadRequest(
          "توکن اعتبار سنجی ارسال نشده یا صحیح نمی باشد ( لطفا درخواست کد اعتبار سنجی بدهید )"
        )
      )
    )
  }
}
