const { createError } = require("../helpers/Functions")
const { modelName } = require("../../../config/Constant")
const { playerModelName } = modelName
const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const { createPlayerPrismaQuery } = require("../prismaQuery/player")
const { resposeHandler } = require("../helpers/responseHandler")
const { getPresignedUrlToUploadPlayerFacePiture } = require("../services/cloud")
const { update } = require("../helpers/prisma")
const { calculatePlayerSalary } = require("../helpers/formula")
const { validateTShirtNumber } = require("../modelHelperFunction/player")
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
    } = req.body

    const { Key, fields, url } = await getPresignedUrlToUploadPlayerFacePiture(
      facePicture
    )

    const totalPower =
      +controll +
      +technique +
      +flexibility +
      +drible +
      +experience +
      +focus +
      +pass +
      +shoot +
      +spead +
      +stamina

    const player = await createPlayerPrismaQuery({
      name,
      age: +age,
      salary: calculatePlayerSalary(totalPower, age),
      controll,
      technique,
      flexibility,
      drible,
      experience,
      focus,
      pass,
      shoot,
      spead,
      stamina,
      totalPower,
      facePictureUrl: Key,
      positionId,
      nationality,
      status: "New",
      tShirtNumber: +tShirtNumber,
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

    const isValidTShirtNumber = await validateTShirtNumber(tShirtNumber, teamId)

    if (!isValidTShirtNumber) {
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
