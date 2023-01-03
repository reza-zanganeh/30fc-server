const { readGeneralDataAndSaveOnRedis } = require("../helpers/Functions")
const { Ok } = require("../helpers/HttpResponse")
const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
module.exports.updateRedisData = async (req, res, next) => {
  try {
    await readGeneralDataAndSaveOnRedis()
    resposeHandler(res, {}, Ok({ operationName: "بروزرسانی" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
