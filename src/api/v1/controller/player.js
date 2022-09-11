const { createError } = require("../helpers/Functions")
const { modelName } = require("../../../config/Constant")
const { playerModelName } = modelName
const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const { createPlayer } = require("../dataLogic/player")
const { resposeHandler } = require("../helpers/responseHandler")
const { getPresignedUrlToUploadPlayerFacePiture } = require("../services/cloud")
const { update, readAll } = require("../helpers/prisma")
// admin
// create player
module.exports.createPlayerByAdmin = async (req, res, next) => {
  try {
    const {
      name,
      fileName: facePicture,
      age,
      positionId,
      nationality,
      // power
      spead,
      controll,
      pass,
      flexibility,
      stamina,
      technique,
      shoot,
      drible,
      focus,
      experience,
      //
      tShirtNumber,
      price,
    } = req.body

    const { Key, fields, url } = await getPresignedUrlToUploadPlayerFacePiture(
      facePicture
    )

    const player = await createPlayer({
      name,
      age: +age,
      // TODO : clalc salary
      salary: 100,
      // power
      controll: +controll,
      technique: +technique,
      flexibility: +flexibility,
      drible: +drible,
      experience: +experience,
      focus: +focus,
      pass: +pass,
      shoot: +shoot,
      spead: +spead,
      stamina: +stamina,
      facePictureUrl: Key,
      positionId: +positionId,
      teamId: null,
      nationality,
      status: "INMARKET",
      tShirtNumber: +tShirtNumber,
      price: +price,
    })

    resposeHandler(res, { ...player, url, fields }, Ok("ساخت بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.chnageTShirtNumber = async (req, res, next) => {
  try {
    const { tShirtNumber, playerId } = req.body
    const { id: teamId } = req.team

    const players = await readAll(
      playerModelName.english,
      {
        teamId: +teamId,
      },
      { id: true, tShirtNumber: true }
    )

    const player = players.find((player) => player.id == playerId)

    if (!player) {
      return next(
        createError(
          BadRequest(
            "شناسه بازیکن معتبر نمی باشد یا این بازیکن در تیم شما نیست"
          )
        )
      )
    }
    const playerWithSameSelectedTShirtNumber = players.find(
      (player) => player.tShirtNumber == tShirtNumber
    )

    if (playerWithSameSelectedTShirtNumber) {
      return next(
        createError(
          BadRequest(
            "شماره پیراهن بازیکنان یک تیم نمی تواند مشابه باشد . شما یک بازیکن با شماره پیراهن انتخابی دارید"
          )
        )
      )
    }

    const updatedPalyer = await update(
      playerModelName.english,
      { id: +playerId },
      { tShirtNumber: +tShirtNumber }
    )

    resposeHandler(res, updatedPalyer, Ok("تغییر شماره پیراهن بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
