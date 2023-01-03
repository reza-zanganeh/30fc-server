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
const { create, readWithPaginationOrId } = require("../helpers/prisma")
const projectConfig = require("../../../config/index")
const { modelName } = require("../../../config/Constant")
const { playerFacePictureModelName } = modelName
module.exports.createPlayerFacePicture = async (req, res, next) => {
  try {
    const { fileName, isSpecial } = req.body
    const { url, fields, Key } = await getPresignedUrlToUploadPlayerFacePiture(
      fileName
    )

    const newPlayerFacePicture = await create(
      playerFacePictureModelName.english,
      {
        pictureUrl: Key,
        isSpecial,
      }
    )

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
    const playerFacePicture = await readWithPaginationOrId(
      playerFacePictureModelName.english,
      +id,
      page
    )

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
      Ok({ operationName: "خواندن تصاویر بازیکنان" })
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
