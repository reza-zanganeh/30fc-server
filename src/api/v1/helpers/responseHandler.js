const { validationResult } = require("express-validator")
const {
  InternalServerError,
  Ok,
  NotFound,
  BadRequest,
} = require("./HttpResponse")
module.exports.errorHandler = (err, req, res, next) => {
  const {
    message: internalServerErrorMessage,
    statusCode: internalServerErrorStatusCode,
  } = InternalServerError()
  res.status(err.statusCode || internalServerErrorStatusCode).json({
    message: err.message || internalServerErrorMessage,
  })
}

module.exports.resposeHandler = (res, data, { statusCode, message }) => {
  const { message: okMessage, statusCode: okStatusCode } = Ok()
  res.status(statusCode || okStatusCode).json({
    data: data || {},
    message: message || okMessage,
  })
}

module.exports.notFoundResponse = (req, res, next) => {
  const { message: notFoundMessage, statusCode: notFoundStatusCode } =
    NotFound()
  this.resposeHandler(
    res,
    {},
    { statusCode: notFoundStatusCode, message: notFoundMessage }
  )
}

module.exports.expressValidationResultHandler = (req, res, next) => {
  const { statusCode: badRequestStatusCode } = BadRequest()
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(badRequestStatusCode).json({ errors: errors.array() })
  }
  next()
}
