const { createError } = require("../../helpers/Functions")
const { BadRequest, Forbidden } = require("../../helpers/HttpResponse")
const { readOne } = require("../../helpers/prisma")
const { internalServerErrorHandler } = require("../../helpers/responseHandler")
const { modelName } = require("../../../../config/Constant")
const { privateChatModelName, teamModelName } = modelName
module.exports.accessToPrivateChat = async (req, res, next) => {
  try {
    const { privateChatId } = req.body

    if (!privateChatId)
      return next(
        createError(BadRequest("شناسه چت خصوصی مورد نظر ارسال نشده است"))
      )

    const privateChat = await readOne(privateChatModelName.english, {
      id: +privateChatId,
    })

    if (!privateChat)
      return next(
        createError(BadRequest("شناسه چت خصوصی ارسال شده معتبر نمی باشد"))
      )

    const { teamOneId, teamTwoId } = privateChat
    const { id: teamId } = req[teamModelName.english]

    if (teamId === teamOneId || teamId === teamTwoId) {
      req[privateChatModelName.english] = privateChat
      next()
    } else return next(createError(Forbidden()))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
