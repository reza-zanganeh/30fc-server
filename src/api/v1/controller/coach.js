const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  BadRequest,
  Ok,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const { coachModelName, teamModelName } = modelName
const { readOne, update, readAll } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")

module.exports.getCoach = async (req, res, next) => {
  try {
    const { level } = req.user
    const coaches = await readAll(coachModelName.english)
    let correctedCoaches = coaches
    if (req.team.coachId && level !== "LEVEL1") {
      const { coachId } = req.team
      const currentCoach = await readOne(coachModelName.english, {
        id: +coachId,
      })
      correctedCoaches = coaches.filter((coach) => {
        if (coach.level > currentCoach.level) {
          coach.priceToUpgrade = coach.price - currentCoach.price
          return true
        } else return false
      })
    }

    resposeHandler(res, correctedCoaches, Ok("خواندن مربی های تمرین"))
  } catch (error) {
    console.log(error)
    next(createError(InternalServerError()))
  }
}

module.exports.buyCoach = async (req, res, next) => {
  try {
    const { id: teamId, coinCount, coachId: prevCoachId, gymId } = req.team

    if (!gymId)
      return next(
        createError(
          BadRequest(
            "برای استفاده از مربی تمرین نیاز به باشگاه است . لطفا ابتدا باشگاه تهیه کنید"
          )
        )
      )

    const { id: newCoachId, price: newCoachPrice } = req[coachModelName.english]
    let coinCountToPay
    if (prevCoachId) {
      const prevCoach = await readOne(coachModelName.english, {
        id: +prevCoachId,
      })
      coinCountToPay = newCoachPrice - prevCoach.price
    } else {
      coinCountToPay = newCoachPrice
    }
    if (coinCountToPay <= 0)
      return next(
        createError(
          BadRequest(
            "سطح مربی تمرین شما از مربی تمرین مورد نظر بالاتر یا برابر می باشد"
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
      { coinCount: newCoinCount, coachId: +newCoachId }
    )

    resposeHandler(
      res,
      { coinCountToPay, newCoachId },
      Ok("خرید مربی تمرین جدید")
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
