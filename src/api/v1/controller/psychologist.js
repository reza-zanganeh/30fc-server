const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { psychologistModelName, teamModelName, teamAssetsModelName } = modelName
const { readOne, update } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")

module.exports.usePsychologist = async (req, res, next) => {
  try {
    const { id: teamId, spirit } = req[teamModelName.english]
    const teamAssets = await readOne(teamAssetsModelName, { teamId: +teamId })
    const { psychologistId, isUsedPsychologist } = teamAssets

    if (!psychologistId)
      return next(
        createError(
          BadRequest(
            "تیم شما دارای روانپزشک نمی باشد ( لطفا یک روانپزشک از مارکت خریداری کنید )"
          )
        )
      )

    if (isUsedPsychologist)
      return next(
        createError(
          BadRequest("هر 12 ساعت یکبار می توان از روانپزشک استفاده کرد")
        )
      )

    const psychologist = await readOne(psychologistModelName.english, {
      id: +psychologistId,
    })
    const { ability: psychologistAbility } = psychologist

    const newSpirit = spirit + psychologistAbility

    const updatedTeam = await update(
      teamModelName.english,
      { id: +teamId },
      { spirit: newSpirit > 100 ? 100 : newSpirit }
    )

    resposeHandler(res, updatedTeam, Ok({ operationName: "افزایش روحیه تیم" }))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
