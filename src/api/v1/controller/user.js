const persianDate = require("persian-date").toLocale("fa")
const { modelName } = require("../../../config/Constant")
const {
  Ok,
  InternalServerError,
  BadRequest,
} = require("../helpers/HttpResponse")
const { userModelName } = modelName
const { update, readOne } = require("../helpers/prisma")
const {
  resposeHandler,
  internalServerErrorHandler,
} = require("../helpers/responseHandler")
const { createError } = require("../helpers/Functions")
const {
  addUserToNeedLoginAgainInRedis,
  removeUserFromNeedLoginAgainInRedis,
} = require("../services/redis")
const {
  getPresignedUrlToUploadUserProfilePiture,
} = require("../services/cloud")
module.exports.getUserInformationWithToken = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await readOne(userModelName.english, { id: +userId })
    delete user.password
    resposeHandler(res, user, Ok({ operationName: "دریافت اطلاعات کاربر" }))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.blockUser = async (req, res, next) => {
  try {
    const { userId } = req.body
    const { isBlock, fullname } = req[userModelName.english]

    if (isBlock)
      return next(
        createError(BadRequest(`ادمین محترم کاربر ${fullname} مسددود می باشد`))
      )

    const blockedUser = await update(
      userModelName.english,
      { id: +userId },
      { isBlock: true }
    )

    await addUserToNeedLoginAgainInRedis(userId)

    delete blockedUser.password

    resposeHandler(
      res,
      blockedUser,
      Ok({ operationName: `ادمین محترم مسدودیت کاربر ${blockedUser.fullname}` })
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.unBlockUser = async (req, res, next) => {
  try {
    const { userId } = req.body
    const { isBlock, fullname } = req[userModelName.english]

    if (!isBlock)
      return next(
        createError(BadRequest(`ادمین محترم کاربر ${fullname} مسددود نمی باشد`))
      )

    const unBlockedUser = await update(
      userModelName.english,
      { id: +userId },
      { isBlock: false }
    )

    await removeUserFromNeedLoginAgainInRedis(userId)

    delete unBlockedUser.password

    resposeHandler(
      res,
      unBlockedUser,
      Ok({
        operationName: `ادمین محترم خروج از مسدودیت کاربر ${unBlockedUser.fullname}`,
      })
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.completionInformation = async (req, res, next) => {
  try {
    const { gender, birthday, country, state, city, bio } = req.body
    const userId = req.user.id
    // TODO : add coin gift
    const r = await update(
      userModelName.english,
      { id: +userId },
      {
        gender,
        birthday: new Date(+birthday).toISOString(),
        country,
        state,
        city,
        bio,
      }
    )
    resposeHandler(res, {}, Ok("اطلاعات با موفقت اپدیت شد"))
  } catch (error) {
    console.log(error)
    internalServerErrorHandler(next, error)
  }
}

module.exports.getInviteCode = (req, res, next) => {
  try {
    const userId = req.user.id
    resposeHandler(
      res,
      { inviteCode: userId },
      Ok("دریافت کد دعوت دوستان به بازی")
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
