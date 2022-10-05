const { createError } = require("./Functions")
const { resposeHandler } = require("./responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("./HttpResponse")

const {
  create,
  readWithPaginationOrId,
  update,
  remove,
  readOne,
  readAll,
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
    console.log(error)
    if (error.code === "P2002") {
      return next(
        createError(
          BadRequest(`مقدار ${error.meta.target[0]} نمی تواند تکراری باشد`)
        )
      )
    }
    next(createError(InternalServerError()))
  }
}

const readWithIdController = async (MODELNAME, req, res, next) => {
  try {
    const { id } = req.params
    const records = await readOne(MODELNAME.english, { id: +id })
    resposeHandler(res, records, Ok(`خواندن ${MODELNAME.persian}`))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

const readController = async (MODELNAME, req, res, next) => {
  try {
    const { id, page } = req.query
    const records = await readWithPaginationOrId(MODELNAME.english, +id, page)
    resposeHandler(res, records, Ok(`خواندن ${MODELNAME.persian}`))
  } catch (error) {
    next(createError(InternalServerError()))
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
    else next(createError(InternalServerError()))
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
    else next(createError(InternalServerError()))
  }
}

const getTeamAssetsWithPriceForUpgrade = async (MODELNAME, req, res, next) => {
  try {
    const { level } = req.user
    const records = await readAll(MODELNAME.english)
    let correctedRecords = records
    if (req.team?.[`${MODELNAME.english}Id`] && level !== "LEVEL1") {
      const assetId = req.team[`${MODELNAME.english}Id`]
      const currentAsset = await readOne(MODELNAME.english, {
        id: +assetId,
      })
      correctedRecords = records.filter((record) => {
        if (record.level > currentAsset.level) {
          record.priceToUpgrade = record.price - currentAsset.price
          return true
        } else return false
      })
    }

    resposeHandler(res, correctedRecords, Ok(`خواندن ${MODELNAME.persian}`))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

const buyTeamAsset = async (MODELNAME, req, res, next) => {
  try {
    const { id: teamId, coinCount } = req.team
    const prevAssetId = req.team[`${MODELNAME.english}Id`]
    const { id: newAssetId, price: newAssetPrice } = req[MODELNAME.english]
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
    updatedTeamData[`${MODELNAME.english}Id`] = +newAssetId
    await update("team", { id: +teamId }, updatedTeamData)

    const resposeData = { coinCountToPay }
    resposeData[`${MODELNAME.english}Id`] = newAssetId
    resposeHandler(res, resposeData, Ok(`خرید ${MODELNAME.persian} جدید`))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports = (MODELNAME) => ({
  createController: createController.bind(null, MODELNAME),
  readController: readController.bind(null, MODELNAME),
  updateConrtoller: updateConrtoller.bind(null, MODELNAME),
  deleteController: deleteController.bind(null, MODELNAME),
  readWithIdController: readWithIdController.bind(null, MODELNAME),
  getTeamAssetsWithPriceForUpgrade: getTeamAssetsWithPriceForUpgrade.bind(
    null,
    MODELNAME
  ),
  buyTeamAsset: buyTeamAsset.bind(null, MODELNAME),
})
