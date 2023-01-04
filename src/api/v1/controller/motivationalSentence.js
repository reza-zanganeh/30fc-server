const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
const {
  getMotivationalSenteceCounter,
  increaseMotivationalSenteceCounter,
} = require("../services/redis")
const { modelName } = require("../../../config/Constant")
const { motivationalSentenceModelName } = modelName
const { getNthRecord } = require("../helpers/prisma")
const { Ok } = require("../helpers/HttpResponse")
module.exports.getMotivationalSentence = async (req, res, next) => {
  try {
    const motivationalSenteceCounter = await getMotivationalSenteceCounter()
    const sentence = await getNthRecord(
      motivationalSentenceModelName.english,
      motivationalSenteceCounter
    )
    await increaseMotivationalSenteceCounter()
    resposeHandler(res, sentence, Ok("خواندن جمله انگیزشی"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
