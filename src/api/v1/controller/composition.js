const { createError } = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const {
  createComposition,
  deleteComposition,
  readComposition,
} = require("../dataLogic/composition")
module.exports.createComposition = async (req, res, next) => {
  try {
    const {
      goalKeaper,
      leftDefender,
      middle1Defender,
      middle2Defender,
      middle3Defender,
      rightDefender,
      leftMidfielder,
      middle1Midfielder,
      middle2Midfielder,
      middle3Midfielder,
      rightMidfielder,
      leftAttacker,
      middle1Attacker,
      middle2Attacker,
      middle3Attacker,
      rightAttacker,
      score,
    } = req.body

    const positions = {
      goalKeaper,
      leftDefender,
      middle1Defender,
      middle2Defender,
      middle3Defender,
      rightDefender,
      leftMidfielder,
      middle1Midfielder,
      middle2Midfielder,
      middle3Midfielder,
      rightMidfielder,
      leftAttacker,
      middle1Attacker,
      middle2Attacker,
      middle3Attacker,
      rightAttacker,
    }
    let playerCount = 0

    for (const position of Object.values(positions)) {
      if (position) playerCount++
    }

    if (playerCount > 11)
      return next(
        createError(
          BadRequest("تعداد بازیکنان داخل ترکیب باید کمتر از 11 باشد")
        )
      )

    const newComposition = await createComposition({
      goalKeaper,
      leftDefender,
      middle1Defender,
      middle2Defender,
      middle3Defender,
      rightDefender,
      leftMidfielder,
      middle1Midfielder,
      middle2Midfielder,
      middle3Midfielder,
      rightMidfielder,
      leftAttacker,
      middle1Attacker,
      middle2Attacker,
      middle3Attacker,
      rightAttacker,
      score,
    })

    resposeHandler(res, newComposition, Created("ترکیب"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
module.exports.readComposition = async (req, res, next) => {
  try {
    const { id, page } = req.query
    const composition = await readComposition(id, page || 1)
    resposeHandler(res, composition, Ok("خواندن ترکیب"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.deleteComposition = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedComposition = await deleteComposition(id)
    resposeHandler(res, deletedComposition, Created("حذف ترکیب"))
  } catch (error) {
    if (error.code === "P2025")
      next(createError(BadRequest("ترکیب با این شناسه وجود ندارد")))
    else next(createError(InternalServerError()))
  }
}
