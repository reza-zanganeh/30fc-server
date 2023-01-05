const { createError } = require("../helpers/Functions")
const {
  resposeHandler,
  internalServerErrorHandler,
} = require("../helpers/responseHandler")
const {
  InternalServerError,
  Created,
  BadRequest,
} = require("../helpers/HttpResponse")
const { create } = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const { compositionModelName } = modelName
module.exports.createComposition = async (req, res, next) => {
  try {
    const {
      Goalkeaper_No,
      Defender_Left,
      Defender_One,
      Defender_Two,
      Defender_Three,
      Defender_Right,
      Midfielder_Left,
      Midfielder_One,
      Midfielder_Two,
      Midfielder_Three,
      Midfielder_Right,
      Attacker_Left,
      Attacker_One,
      Attacker_Two,
      Attacker_Three,
      Attacker_Right,
    } = req.body

    const positions = {
      Goalkeaper_No,
      Defender_Left,
      Defender_One,
      Defender_Two,
      Defender_Three,
      Defender_Right,
      Midfielder_Left,
      Midfielder_One,
      Midfielder_Two,
      Midfielder_Three,
      Midfielder_Right,
      Attacker_Left,
      Attacker_One,
      Attacker_Two,
      Attacker_Three,
      Attacker_Right,
    }
    const playerCount = {
      total: 0,
      DEFENDER: 0,
      MIDFIELDER: 0,
      ATTACKER: 0,
    }

    for (const position of Object.values(positions)) {
      if (position) {
        playerCount.total++
        const major = position.split("_")[0]
        playerCount[major]++
      }
    }

    if (playerCount !== 11)
      return next(
        createError(BadRequest("تعداد بازیکنان داخل ترکیب باید برابر 11 باشد"))
      )

    const newComposition = await create(compositionModelName.english, {
      Goalkeaper_No,
      Defender_Left,
      Defender_One,
      Defender_Two,
      Defender_Three,
      Defender_Right,
      Midfielder_Left,
      Midfielder_One,
      Midfielder_Two,
      Midfielder_Three,
      Midfielder_Right,
      Attacker_Left,
      Attacker_One,
      Attacker_Two,
      Attacker_Three,
      Attacker_Right,
      name: `${playerCount.DEFENDER}-${playerCount.MIDFIELDER}-${playerCount.DEFENDER}`,
    })

    resposeHandler(res, newComposition, Created("ترکیب"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
