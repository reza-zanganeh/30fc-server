const { gameSettings, modelName } = require("../../../config/Constant")
const {
  requestToCreatePlayerModelName,
  playerModelName,
  playerFacePictureModelName,
} = modelName
const {
  resposeHandler,
  internalServerErrorHandler,
} = require("../helpers/responseHandler")
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
const { calculatePlayerSalary } = require("../helpers/formula")
const {
  createRequestToCreatePlayerPrismaQuery,
  confirmRequestToCreatePlayerPrismaQuery,
  reactivationRequestToCreatePlayerPrismaQuery,
  rejectRequestToCreatePlayerPrismaQuery,
} = require("../prismaQuery/requestToCreatePlayer")

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
            "درحال حاضر شما دارای درخواست بازیکن فعال می باشید. شما می توانید در صورت منصرف شدن انرا حذف کنید و اگر درخواست شما رد شده است لطفا انرا اصلاح کنید و مجدد ان را فعال کنید یا انرا حذف کنید"
          )
        )
      )

    const { url, fields, Key } = await getPresignedUrlToUploadPlayerFacePiture(
      facePictureFileName
    )

    const totalPower =
      +controll +
      +drible +
      +experience +
      +flexibility +
      +focus +
      +shoot +
      +spead +
      +pass +
      +stamina +
      +technique
    const salary = await calculatePlayerSalary(totalPower, age)

    const newRequest = await createRequestToCreatePlayerPrismaQuery(+teamId, {
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
      Ok({
        operationName:
          "درخواست شما برای ساخت بازیکن با موفقیت ثبت شد . در اسرع وقت به درخواست شما پاسخ می دهیم",
      })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
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

    const confirmedRequest = await confirmRequestToCreatePlayerPrismaQuery(
      +requestId,
      price,
      adminResponse
    )

    resposeHandler(
      res,
      confirmedRequest,
      Ok({ operationName: "تایید ساخت بازیکن" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
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

    const rejectedRequest = await rejectRequestToCreatePlayerPrismaQuery(
      +requestId,
      adminResponse
    )

    resposeHandler(
      res,
      rejectedRequest,
      Ok({ operationName: "رد ساخت بازیکن" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
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

    const reactivedRequest = await reactivationRequestToCreatePlayerPrismaQuery(
      requestId
    )

    resposeHandler(
      res,
      reactivedRequest,
      Ok({ operationName: "فعال سازی درخواست ساخت بازیکن" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
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

    resposeHandler(
      res,
      removeRequest,
      Ok({ operationName: "حذف درخواست ساخت بازیکن" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// get own team not confirmed request
module.exports.getRequestToCreatePlayer = async (req, res, next) => {
  try {
    const { role } = req.user
    let requests

    if (role === "Admin")
      requests = await readAll(requestToCreatePlayerModelName.english)
    else {
      const { id: teamId } = req.team
      requests = await readAll(requestToCreatePlayerModelName.english, {
        teamId,
      })
    }

    resposeHandler(
      res,
      requests,
      Ok({ operationName: "خواندن درخواست های ساخت بازیکن" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
