const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { gymModelName, teamModelName, coachModelName, playerModelName } =
  modelName
const { readOne, update, readAll } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")

module.exports.getGym = async (req, res, next) => {
  try {
    const { level } = req.user
    const gyms = await readAll(gymModelName.english)
    let correctedGyms = gyms
    if (req.team?.gymId && level !== "LEVEL1") {
      const { gymId } = req.team
      const currentGym = await readOne(gymModelName.english, { id: +gymId })
      correctedGyms = gyms.filter((gym) => {
        if (gym.level > currentGym.level) {
          gym.priceToUpgrade = gym.price - currentGym.price
          return true
        } else return false
      })
    }

    resposeHandler(res, correctedGyms, Ok("خواندن باشگاه ها"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.buyGym = async (req, res, next) => {
  try {
    const { id: teamId, coinCount, gymId: prevGymId } = req.team
    const { id: newGymId, price: newGymPrice } = req[gymModelName.english]
    let coinCountToPay
    if (prevGymId) {
      const prevGym = await readOne(gymModelName.english, { id: +prevGymId })
      coinCountToPay = newGymPrice - prevGym.price
    } else {
      coinCountToPay = newGymPrice
    }

    if (coinCountToPay <= 0)
      return next(
        createError(
          BadRequest(
            "سطح باشگاه شما از باشگاه مورد نظر بالاتر با برابر می باشد"
          )
        )
      )

    if (coinCountToPay > coinCount)
      return next(
        createError(
          BadRequest(
            `موجودی سکه شما کافی نمی باشد . برای این خرید شما نیاز به ${
              coinCount - coinCountToPay
            } سکه بیشتر دارید`
          )
        )
      )

    const newCoinCount = coinCount - coinCountToPay
    await update(
      teamModelName.english,
      { id: +teamId },
      { coinCount: newCoinCount, gymId: +newGymId }
    )

    resposeHandler(res, { coinCountToPay, newGymId }, Ok("خرید باشگاه جدید"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.useGym = async (req, res, next) => {
  try {
    const { playerId, power } = req.body
    const { id: teamId, gymId, coachId, usedGymCount } = req.team

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

    if (!player)
      return next(
        createError(
          BadRequest(
            "شناسه بازیکن معتبر نمی باشد یا بازیکن متعاق به تیم شما نیست"
          )
        )
      )

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
