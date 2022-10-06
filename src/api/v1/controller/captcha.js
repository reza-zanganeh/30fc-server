const svgCaptcha = require("svg-captcha")
const { createCaptchaToken } = require("../helpers/Functions")
const { Ok } = require("../helpers/HttpResponse")
const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")

module.exports.getCaptcha = async (req, res, next) => {
  try {
    const { data: image, text } = svgCaptcha.create({ size: 5, noise: 2 })

    const token = createCaptchaToken(text)

    resposeHandler(res, { image, token }, Ok("ایجاد کپچا"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
