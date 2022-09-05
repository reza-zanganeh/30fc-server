const { createError } = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const {
  getPresignedUrlToUploadPlayerFacePiture,
  deletePlayerFacePictureFromCloud,
} = require("../services/cloud")
const { create, read, remove } = require("../helpers/prismaCRUDoperation")
const projectConfig = require("../../../config/index")
const MODELNAME = "playerFacePicture"
module.exports.createPlayerFacePicture = async (req, res, next) => {
  try {
    const { fileName } = req.body
    const { url, fields, Key } = await getPresignedUrlToUploadPlayerFacePiture(
      fileName
    )

    const newPlayerFacePicture = await create(MODELNAME, { pictureUrl: Key })

    resposeHandler(
      res,
      { ...newPlayerFacePicture, url, fields },
      Created("لینک برای اپلود تصویر بازیکن ساخته شد")
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
module.exports.readPlayerFacePicture = async (req, res, next) => {
  try {
    const { id, page } = req.query
    const playerFacePicture = await read(MODELNAME, { id: +id }, page || 1)
    const baseUrl =
      projectConfig.cloud.endPointUrl +
      "/" +
      projectConfig.cloud.bucket.playerFacePicture
    resposeHandler(
      res,
      {
        baseUrl,
        playerFacePicture,
      },
      Ok("خواندن تصاویر بازیکنان")
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.deletePlayerFacePicture = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedPlayerFacePicture = await remove(MODELNAME, { id: +id })

    deletePlayerFacePictureFromCloud(deletedPlayerFacePicture.pictureUrl)

    resposeHandler(
      res,
      deletedPlayerFacePicture,
      Created("حذف تصویر چهره بازیکن")
    )
  } catch (error) {
    if (error.code === "P2025")
      next(createError(BadRequest("چهره بازیکن با این شناسه وجود ندارد")))
    else next(createError(InternalServerError()))
  }
}
