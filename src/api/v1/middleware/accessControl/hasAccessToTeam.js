const { modelName } = require("../../../../config/Constant")
const { teamModelName } = modelName
const { Forbidden, BadRequest } = require("../../helpers/HttpResponse")
const { createError } = require("../../helpers/Functions")
const { readOne } = require("../../helpers/prisma")

module.exports.hasAccessToTeam = async (req, res, next) => {
  try {
    const { id } = req.user

    const teamId = req.body?.id || req.params?.id || req.query?.id

    if (!teamId)
      return next(createError(BadRequest("مقدار شناسه تیم ارسال نشده است")))

    const team = await readOne(teamModelName.english, {
      id: +teamId,
    })

    if (!team)
      return next(createError(BadRequest("تیم انتخابی شما معتبر نمی باشد")))

    if (team.ownerId !== id) next(createError(Forbidden()))

    req[teamModelName.english] = team
  } catch (error) {
    next(createError(Forbidden()))
  }
}
