const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const {
  gymModelName,
  teamModelName,
  coachModelName,
  playerModelName,
  teamAssetsModelName,
} = modelName
const { readOne, update } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")

module.exports.useGym = async (req, res, next) => {
  try {
    const { playerId, power } = req.body
    const { id: teamId } = req[teamModelName.english]
    const teamAssets = await readOne(teamAssetsModelName.english, {
      teamId: +teamId,
    })
    const { gymId, coachId, usedGymCount } = teamAssets

    if (!gymId)
      return next(
        createError(
          BadRequest(
            "تیم شما دارای باشگاه تمرین نمی باشد ( لطفا یک باشگاه اجاره کنید )"
          )
        )
      )

    if (!coachId)
      return next(
        createError(
          BadRequest(
            "تیم شما دارای مربی تمرین نمی باشد ( لطفا یک مربی اجاره کنید )"
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

    const newTotalPower = player.totalPower + coach.ability
    const updatedPlayerData = {
      status: "PRACTICEDINTEAM",
      totalPower: newTotalPower >= 3000 ? 3000 : newTotalPower,
    }
    const newAmountOfPower = player[power] + coach.ability
    updatedPlayerData[power] = newAmountOfPower >= 300 ? 300 : newAmountOfPower
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
