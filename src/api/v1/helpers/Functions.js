const jwt = require("jsonwebtoken")
const projectConfig = require("../../../config/index")

const createJsonWebToken = (data, expiresIn) => {
  const token = jwt.sign(data, projectConfig.jsonwebtoken.tokenKey, {
    expiresIn: `${expiresIn}m`,
  })
  return token
}

module.exports.createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports.createError = ({ statusCode, message }) => {
  const error = new Error()
  error.statusCode = statusCode
  error.message = message
  return error
}

module.exports.createOtpCodeToken = (phonenumber) => {
  return createJsonWebToken(
    {
      phonenumber,
    },
    projectConfig.otpCode.expiresTimeInMilisecond
  )
}

module.exports.createAuthenticationToken = (id) => {
  return createJsonWebToken(
    {
      id,
    },
    projectConfig.jsonwebtoken.authenticationTokenExpiresTimeInMilisecond
  )
}

module.exports.convertSecondToMinAndScond = (time) => {
  const minute = Math.floor(time / 60)
  const second = time - minute * 60
  return {
    minute,
    second,
  }
}
