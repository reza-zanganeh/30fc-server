const { gameSettings, modelName } = require("../../../config/Constant")
const {
  requestToCreatePlayerModelName,
  playerModelName,
  playerFacePictureModelName,
} = modelName
const { resposeHandler } = require("../helpers/responseHandler")
const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const { maximumPalyerCount } = gameSettings
const { readOne, remove, readAll } = require("../helpers/prisma")
const {
  getPresignedUrlToUploadPlayerFacePiture,
  deletePlayerFacePictureFromCloud,
} = require("../services/cloud")
const {
  createRequestToCreatePlayer,
  confirmRequestToCreatePlayer,
  rejectRequestToCreatePlayer,
  deleteRequestToCreatePlayer,
  reactivationRequestToCreatePlayer,
} = require("../dataLogic/requestToCreatePlayer")

module.exports.createRequestToCreatePlayer = async (req, res, next) => {
  try {
    const {
      name,
      fileName: facePictureFileName,
      age,
      positionId,
      nationality,
      tShirtNumber,
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
    } = req.body

    const { playerCount, id: teamId } = req.team

    if (playerCount > maximumPalyerCount)
      return next(
        createError(
          BadRequest(
            `شما حداکثر می توانید ${maximumPalyerCount} بازیکن داشته باشید`
          )
        )
      )

    const previousCreatePlayerRequest = await readOne(
      requestToCreatePlayerModelName.english,
      {
        teamId: +teamId,
        NOT: {
          status: {
            equals: "CONFIRM",
          },
        },
      }
    )

    if (previousCreatePlayerRequest)
      return next(
        createError(
          BadRequest(
            "درحال حاضر شما دارای درخواست بازیکن فعال می باشید. شما می توانید در صورت منصرف شدن انرا حذف کنید و اگر درخواست شما رد شده است لطفا انرا اصلاح کنید و مجدد ان را فعال کنید"
          )
        )
      )

    const { url, fields, Key } = await getPresignedUrlToUploadPlayerFacePiture(
      facePictureFileName
    )

    // TODO calc salary base on power and age
    const salary = 100

    const newRequest = await createRequestToCreatePlayer(+teamId, {
      name,
      age: +age,
      salary,
      controll: +controll,
      drible: +drible,
      experience: +experience,
      flexibility: +flexibility,
      focus: +focus,
      shoot: +shoot,
      spead: +spead,
      pass: +pass,
      stamina: +stamina,
      technique: +technique,
      pictureUrl: Key,
      positionId,
      nationality,
      tShirtNumber: +tShirtNumber,
    })

    resposeHandler(
      res,
      { ...newRequest, url, fields },
      Ok(
        "درخواست شما برای ساخت بازیکن با موفقیت ثبت شد . در اسرع وقت به درخواست شما پاسخ می دهیم"
      )
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

// confirm requets with admin
module.exports.confirmRequestToCreatePlayer = async (req, res, next) => {
  // player added to market
  try {
    const { requestId, adminResponse, price } = req.body

    const { status } = req[requestToCreatePlayerModelName.english]

    if (status !== "PENDING")
      return next(createError(BadRequest("این درخواست قبلا پاسخ داده شده است")))

    const confirmedRequest = await confirmRequestToCreatePlayer(
      +requestId,
      price,
      adminResponse
    )

    resposeHandler(res, confirmedRequest, Ok("تایید ساخت بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
// reject request with admin
module.exports.rejectRequestToCreatePlayer = async (req, res, next) => {
  // admin reject request and add message
  try {
    const { requestId, adminResponse } = req.body

    const { status } = req[requestToCreatePlayerModelName.english]

    if (status !== "PENDING")
      return next(createError(BadRequest("این درخواست قبلا پاسخ داده شده است")))

    const rejectedRequest = await rejectRequestToCreatePlayer(
      +requestId,
      adminResponse
    )

    resposeHandler(res, rejectedRequest, Ok("رد ساخت بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
//
module.exports.reactivationRequestToCreatePlayer = async (req, res, next) => {
  try {
    const { requestId } = req.body

    const { status, teamId: teamIdInRequest } =
      req[requestToCreatePlayerModelName.english]
    const { id: teamId } = req.team

    if (teamId !== teamIdInRequest)
      return next(
        createError(
          BadRequest("این درخواست ساخت تیم متعلق به تیم شما نمی باشد")
        )
      )

    if (status === "PENDING")
      return next(
        createError(
          BadRequest("این درخواست غعال است لطفا منتظر پاسخ ادمین باشد")
        )
      )

    const reactivedRequest = await reactivationRequestToCreatePlayer(requestId)

    resposeHandler(res, reactivedRequest, Ok("رد درخواست ساخت بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
// remove request with req owner
module.exports.deleteRequestToCreatePlayer = async (req, res, next) => {
  try {
    // check player not in the market
    // check is owner
    const { id } = req.params
    const {
      status,
      teamId: teamIdInRequest,
      playerId,
    } = req[requestToCreatePlayerModelName.english]
    const { id: teamId } = req.team

    if (teamId !== teamIdInRequest)
      return next(
        createError(
          BadRequest("این درخواست ساخت تیم متعلق به تیم شما نمی باشد")
        )
      )

    if (status !== "CONFIRM") {
      const player = await remove(
        playerModelName.english,
        { id: +playerId },
        {
          facePicture: {
            select: {
              id: true,
              pictureUrl: true,
              isSpecial: true,
            },
          },
        }
      )
      await remove(playerFacePictureModelName.english, {
        id: +player.facePicture.id,
      })
      const Key = player.facePicture.pictureUrl
      deletePlayerFacePictureFromCloud(Key)
    }

    const removeRequest = await remove(requestToCreatePlayerModelName.english, {
      id: +id,
    })

    resposeHandler(res, removeRequest, Ok("حذف درخواست ساخت بازیکن"))
  } catch (error) {
    if (error.code === "P2025")
      next(
        createError(BadRequest("درخواست ساخت بازیکن با این شناسه وجود ندارد"))
      )
    next(createError(InternalServerError()))
  }
}
// get own team not confirmed request
module.exports.getRequestToCreatePlayer = async (req, res, next) => {
  try {
    const { level } = req.user
    let requests

    if (level === "LEVEL1")
      requests = await readAll(requestToCreatePlayerModelName.english)
    else {
      const { id: teamId } = req.team
      requests = await readAll(requestToCreatePlayerModelName.english, {
        teamId,
      })
    }

    resposeHandler(res, requests, Ok("خواندن درخواست های ساخت بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
