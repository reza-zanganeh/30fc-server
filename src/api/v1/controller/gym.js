const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { gymModelName, teamModelName, coachModelName, playerModelName } =
  modelName
const { readOne, update } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")

module.exports.useGym = async (req, res, next) => {
  try {
    const { playerId, power } = req.body
    const {
      id: teamId,
      gymId,
      coachId,
      usedGymCount,
    } = req[teamModelName.english]

    if (!gymId)
      return next(
        createError(
          BadRequest(
            "تیم شما دارای باشگاه تمرین نمی باشد ( لطفا یک باشگاه از مارکت خریداری کنید )"
          )
        )
      )

    if (!coachId)
      return next(
        createError(
          BadRequest(
            "تیم شما دارای مربی تمرین نمی باشد ( لطفا یک مربی از مارکت خریداری کنید )"
          )
        )
      )

    const gym = await readOne(gymModelName.english, { id: +gymId })

    if (usedGymCount >= gym.capacity)
      return next(
        createError(
          BadRequest(
            "ظرفیت استفاده از باشگاه شما به پایان رسیده است . شما می توانید سطح انرا افزایش دهید"
          )
        )
      )

    const player = await readOne(playerModelName.english, {
      id: +playerId,
      teamId: +teamId,
    })

    if (player.status === "PRACTICEDINTEAM")
      return next(
        createError(
          BadRequest(
            "(هر بازیکن فقط یکبار در هر 12 ساعت می تواند تمرین کند) این بازیکن تمرین کرده است"
          )
        )
      )

    const coach = await readOne(coachModelName.english, { id: +coachId })

    await update(
      teamModelName.english,
      { id: +teamId },
      { usedGymCount: usedGymCount + 1 }
    )

    const updatedPlayerData = {
      status: "PRACTICEDINTEAM",
      totalPower: player.totalPower + coach.ability,
    }
    updatedPlayerData[power] = player[power] + coach.ability
    const updatedPlayer = await update(
      playerModelName.english,
      { id: +playerId },
      updatedPlayerData
    )

    resposeHandler(res, updatedPlayer, Ok(`تمرین ${player.name}`))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
