const { modelName } = require("../../../config/Constant")
const { teamModelName } = modelName
const { Forbidden, BadRequest } = require("../helpers/HttpResponse")
const { createError } = require("../helpers/Functions")
const { readOne } = require("../helpers/prisma")

module.exports.isMyTeamOrAdmin = async (req, res, next) => {
  try {
    const { id, level } = req.user

    // LEVEL1 = admin
    if (level === "LEVEL1") return next()

    let { teamId } = req.body
    if (!teamId) teamId = req.params.id

    if (!teamId)
      return next(createError(BadRequest("مقدار شناسه تیم ارسال نشده است")))

    const team = await readOne(
      teamModelName.english,
      {
        id: +teamId,
      },
      { id: true, ownerId: true, playerCount: true }
    )
    if (!team)
      return next(createError(BadRequest("تیم انتخابی شما معتبر نمی باشد")))

    if (team.ownerId !== id) next(createError(Forbidden()))

    req.team = team
    next()
  } catch (error) {
    console.log(error)
    next(createError(Forbidden()))
  }
}
