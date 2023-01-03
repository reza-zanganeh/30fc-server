const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { doctorModelName, teamModelName, playerModelName, teamAssetsModelName } =
  modelName
const { readOne, readAll } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")
const { updateTeamPlayersPrismaQuery } = require("../prismaQuery/team")
module.exports.useDoctor = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]
    const teamAssets = await readOne(teamAssetsModelName.english, {
      teamId: +teamId,
    })
    const { doctorId, isUsedDoctor } = teamAssets
    if (!doctorId)
      return next(
        createError(
          BadRequest(
            "تیم شما دارای پزشک نمی باشد ( لطفا یک پزشک از مارکت خریداری کنید )"
          )
        )
      )

    if (isUsedDoctor)
      return next(
        createError(BadRequest("هر 12 ساعت یکبار می توان از پزشک استفاده کرد"))
      )

    const doctor = await readOne(doctorModelName.english, { id: +doctorId })
    const { ability: doctorAbility } = doctor

    // update player and add doctor ability to player injury
    const players = await readAll(
      playerModelName.english,
      { teamId: +teamId },
      { id: true, injury: true }
    )

    const updatedPlayersData = players.map((player) => {
      const { id, injury } = player
      const newInjury = injury - doctorAbility
      return {
        id,
        injury: newInjury > 0 ? newInjury : injury,
      }
    })

    const updatedTeamData = {
      isUsedDoctor: true,
    }

    await updateTeamPlayersPrismaQuery(
      +teamId,
      updatedTeamData,
      updatedPlayersData
    )

    resposeHandler(
      res,
      updatedPlayersData,
      Ok({ operationName: "مداوا بازیکنان تیم" })
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
