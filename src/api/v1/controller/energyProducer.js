const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { energyProducerModelName, teamModelName, playerModelName } = modelName
const { readAll } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")
const { updateTeamPlayers } = require("../dataLogic/team")
module.exports.useEnergyProducer = async (req, res, next) => {
  try {
    const {
      id: teamId,
      coinCount,
      isUsedEnergyProducer,
    } = req[teamModelName.english]
    const { price: energyProducerPrice, ability: energyProducerAbility } =
      req[energyProducerModelName.english]

    if (isUsedEnergyProducer)
      return next(
        createError(
          BadRequest("هر 12 ساعت یکبار می توان از انرژی زا استفاده کرد")
        )
      )

    if (energyProducerPrice > coinCount)
      return next(
        createError(
          BadRequest(
            `موجودی سکه شما کافی نمی باشد . برای این خرید شما نیاز به ${
              coinCount - energyProducerPrice
            } سکه بیشتر دارید`
          )
        )
      )

    const players = await readAll(
      playerModelName.english,
      { teamId: +teamId },
      { id: true, energy: true }
    )

    const updatedPlayersData = players.map((player) => {
      const { id, energy } = player
      const newEnergy = energy + energyProducerAbility
      return {
        id,
        energy: newEnergy <= 100 ? newEnergy : 100,
      }
    })

    const updatedTeamData = {
      isUsedEnergyProducer: true,
    }

    await updateTeamPlayers(+teamId, updatedTeamData, updatedPlayersData)

    resposeHandler(res, updatedPlayersData, Ok("افزایش انرژی بازیکنان"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
