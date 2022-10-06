const { modelName } = require("../../../../config/Constant")
const { teamModelName, playerModelName } = modelName
const { Forbidden, BadRequest } = require("../../helpers/HttpResponse")
const { createError } = require("../../helpers/Functions")
const { readOne, readAll } = require("../../helpers/prisma")

module.exports.hasAccessToPlayer = async (req, res, next) => {
  try {
    const { id } = req.user

    const teamId = req.body?.teamId
    const playerId = req.body?.playerId

    if (!teamId)
      return next(createError(BadRequest("مقدار شناسه تیم ارسال نشده است")))

    if (!playerId)
      return next(createError(BadRequest("مقدار شناسه بازیکن ارسال نشده است")))

    const team = await readOne(teamModelName.english, {
      id: +teamId,
    })

    if (!team)
      return next(createError(BadRequest("تیم انتخابی شما معتبر نمی باشد")))

    if (team.ownerId != id) next(createError(Forbidden()))

    const players = await readAll(
      playerModelName.english,
      { teamId: +teamId },
      { id: true }
    )

    if (!players.find((player) => player.id == playerId))
      next(createError(Forbidden()))

    req[teamModelName.english] = team
    next()
  } catch (error) {
    next(createError(Forbidden()))
  }
}
