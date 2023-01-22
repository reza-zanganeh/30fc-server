const { modelName } = require("../../../config/Constant")
const { teamAssetsModelName } = modelName
const { createError } = require("./Functions")
const {
  resposeHandler,
  internalServerErrorHandler,
} = require("./responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
  emptyMesssage,
} = require("./HttpResponse")

const {
  create,
  readWithPaginationOrId,
  update,
  remove,
  readOne,
  readAll,
  readRecordsSortedByDateWithPagination,
} = require("./prisma")

const createController = async (MODELNAME, dataSchema, req, res, next) => {
  try {
    const data = {}
    dataSchema.forEach((item) => {
      if (isFinite(req.body[item])) data[item] = +req.body[item]
      else if (typeof req.body[item] === "string")
        data[item] = req.body[item].trim()
      else data[item] = req.body[item]
    })
    const newRecord = await create(MODELNAME.english, data)
    resposeHandler(res, newRecord, Created(MODELNAME.persian))
  } catch (error) {
    if (error.code === "P2002") {
      return next(
        createError(
          BadRequest(`مقدار ${error.meta.target[0]} نمی تواند تکراری باشد`)
        )
      )
    }
    internalServerErrorHandler(next, error)
  }
}

const readWithIdController = async (MODELNAME, req, res, next) => {
  try {
    const { id } = req.params
    const records = await readOne(MODELNAME.english, { id: +id })
    resposeHandler(
      res,
      records,
      Ok({ operationName: `خواندن ${MODELNAME.persian}` })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

const readController = async (MODELNAME, req, res, next) => {
  try {
    const { id, page } = req.query
    const records = await readWithPaginationOrId(MODELNAME.english, +id, page)
    resposeHandler(res, records, emptyMesssage())
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

const readRecordsSortedByDateWithPaginationController = async (
  MODELNAME,
  take,
  req,
  res,
  next
) => {
  try {
    const page = req.query.page || 1
    const records = await readRecordsSortedByDateWithPagination(
      MODELNAME.english,
      take,
      page
    )
    resposeHandler(res, records, emptyMesssage())
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

const updateConrtoller = async (MODELNAME, dataSchema, req, res, next) => {
  try {
    const { id } = req.params
    const data = {}
    dataSchema.forEach((item) => {
      data[item] = req.body[item]
    })
    const updatedRecord = await update(MODELNAME.english, { id: +id }, data)
    resposeHandler(
      res,
      updatedRecord,
      Created(`بروزرسانی ${MODELNAME.persian}`)
    )
  } catch (error) {
    if (error.code === "P2025")
      next(
        createError(BadRequest(`${MODELNAME.persian} با این شناسه وجود ندارد`))
      )
    else internalServerErrorHandler(next, error)
  }
}

const deleteController = async (MODELNAME, req, res, next) => {
  try {
    const { id } = req.params
    const deletedRecord = await remove(MODELNAME.english, { id: +id })
    resposeHandler(res, deletedRecord, Created(`حذف ${MODELNAME.persian}`))
  } catch (error) {
    if (error.code === "P2025")
      return next(
        createError(BadRequest(`${MODELNAME.persian} با این شناسه وجود ندارد`))
      )
    if (error.code === "P2003")
      return next(
        createError(BadRequest(`${MODELNAME.persian} درحال استفاده است`))
      )
    else internalServerErrorHandler(next, error)
  }
}

const getTeamAssetsWithPriceForUpgrade = async (MODELNAME, req, res, next) => {
  try {
    const { role } = req.user
    const records = await readAll(MODELNAME.english)
    let correctedRecords = records
    const teamAssets = req.team
      ? await readOne(teamAssetsModelName.english, {
          teamId: +req.team.id,
        })
      : {}
    if (teamAssets?.[`${MODELNAME.english}Id`] && role !== "Admin") {
      const assetId = teamAssets[`${MODELNAME.english}Id`]
      const currentAsset = await readOne(MODELNAME.english, {
        id: +assetId,
      })
      correctedRecords = records.filter((record) => {
        if (+record.level > +currentAsset.level) {
          record.priceToUpgrade = record.price - currentAsset.price
          return true
        } else return false
      })
    }

    resposeHandler(
      res,
      correctedRecords,
      Ok({ operationName: `خواندن ${MODELNAME.persian}` })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

const buyTeamAsset = async (MODELNAME, req, res, next) => {
  try {
    const { id: teamId, coinCount, teamMembershipType } = req.team
    const teamAssets = await readOne(teamAssetsModelName.english, {
      teamId: +teamId,
    })
    const prevAssetId = teamAssets[`${MODELNAME.english}Id`]
    const {
      id: newAssetId,
      price: newAssetPrice,
      level: newAssetLevel,
    } = req[MODELNAME.english]

    if (+newAssetLevel > 2 && teamMembershipType === "Normal")
      return next(
        createError(
          BadRequest(
            `خرید ${MODELNAME.persian} در سطح ${newAssetLevel} فقط برای کاربران نقره ای . طلایی و الماسی امکان پذیر می باشد`
          )
        )
      )

    if (+newAssetLevel > 3 && teamMembershipType === "Silver")
      return next(
        createError(
          BadRequest(
            `خرید ${MODELNAME.persian} در سطح ${newAssetLevel} فقط برای کاربران  طلایی و الماسی امکان پذیر می باشد`
          )
        )
      )
    if (+newAssetLevel > 4 && teamMembershipType === "Golden")
      return next(
        createError(
          BadRequest(
            `خرید ${MODELNAME.persian} در سطح ${newAssetLevel} فقط برای کاربران الماسی امکان پذیر می باشد`
          )
        )
      )

    let coinCountToPay
    if (prevAssetId) {
      const prevAsset = await readOne(MODELNAME.english, { id: +prevAssetId })
      coinCountToPay = newAssetPrice - prevAsset.price
    } else {
      coinCountToPay = newAssetPrice
    }

    if (coinCountToPay <= 0)
      return next(
        createError(
          BadRequest(
            `سطح ${MODELNAME.persian} از سطح ${MODELNAME.persian} مورد نظر بالاتر یا برابر می باشد`
          )
        )
      )

    if (coinCountToPay > coinCount)
      return next(
        createError(
          BadRequest(
            `موجودی سکه شما کافی نمی باشد . برای این خرید شما نیاز به ${
              coinCount - coinCountToPay
            } سکه بیشتر دارید`
          )
        )
      )

    const newCoinCount = coinCount - coinCountToPay

    const updatedTeamData = { coinCount: newCoinCount }
    const updatedAssetsTeamData = {}
    updatedAssetsTeamData[`${MODELNAME.english}Id`] = +newAssetId
    await update("team", { id: +teamId }, updatedTeamData)
    await update(
      teamAssetsModelName.english,
      { teamId: +teamId },
      updatedAssetsTeamData
    )

    const resposeData = { coinCountToPay }
    resposeData[`${MODELNAME.english}Id`] = newAssetId
    resposeHandler(
      res,
      resposeData,
      Ok({ operationName: `خرید ${MODELNAME.persian} جدید` })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports = (MODELNAME) => ({
  createController: createController.bind(null, MODELNAME),
  readController: readController.bind(null, MODELNAME),
  readRecordsSortedByDateWithPaginationController:
    readRecordsSortedByDateWithPaginationController.bind(null, MODELNAME),
  updateConrtoller: updateConrtoller.bind(null, MODELNAME),
  deleteController: deleteController.bind(null, MODELNAME),
  readWithIdController: readWithIdController.bind(null, MODELNAME),
  getTeamAssetsWithPriceForUpgrade: getTeamAssetsWithPriceForUpgrade.bind(
    null,
    MODELNAME
  ),
  buyTeamAsset: buyTeamAsset.bind(null, MODELNAME),
})
