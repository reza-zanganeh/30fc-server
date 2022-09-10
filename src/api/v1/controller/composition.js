const { createError } = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const { create } = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const { compositionModelName } = modelName
module.exports.createComposition = async (req, res, next) => {
  try {
    const {
      GOALKEAPER_NO,
      DEFENDER_LEFT,
      DEFENDER_ONE,
      DEFENDER_TWO,
      DEFENDER_THREE,
      DEFENDER_RIGHT,
      MIDFIELDER_LEFT,
      MIDFIELDER_ONE,
      MIDFIELDER_TWO,
      MIDFIELDER_THREE,
      MIDFIELDER_RIGHT,
      ATTACKER_LEFT,
      ATTACKER_ONE,
      ATTACKER_TWO,
      ATTACKER_THREE,
      ATTACKER_RIGHT,
      score,
    } = req.body

    const positions = {
      GOALKEAPER_NO,
      DEFENDER_LEFT,
      DEFENDER_ONE,
      DEFENDER_TWO,
      DEFENDER_THREE,
      DEFENDER_RIGHT,
      MIDFIELDER_LEFT,
      MIDFIELDER_ONE,
      MIDFIELDER_TWO,
      MIDFIELDER_THREE,
      MIDFIELDER_RIGHT,
      ATTACKER_LEFT,
      ATTACKER_ONE,
      ATTACKER_TWO,
      ATTACKER_THREE,
      ATTACKER_RIGHT,
    }
    let playerCount = 0

    for (const position of Object.values(positions)) {
      if (position) playerCount++
    }

    if (playerCount !== 11)
      return next(
        createError(BadRequest("تعداد بازیکنان داخل ترکیب باید برابر 11 باشد"))
      )

    const newComposition = await create(compositionModelName.english, {
      GOALKEAPER_NO,
      DEFENDER_LEFT,
      DEFENDER_ONE,
      DEFENDER_TWO,
      DEFENDER_THREE,
      DEFENDER_RIGHT,
      MIDFIELDER_LEFT,
      MIDFIELDER_ONE,
      MIDFIELDER_TWO,
      MIDFIELDER_THREE,
      MIDFIELDER_RIGHT,
      ATTACKER_LEFT,
      ATTACKER_ONE,
      ATTACKER_TWO,
      ATTACKER_THREE,
      ATTACKER_RIGHT,
      score,
    })

    resposeHandler(res, newComposition, Created("ترکیب"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
