const { createError } = require("./Functions")
const { resposeHandler } = require("./responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("./HttpResponse")

const { create, read, update, remove } = require("./prismaCRUDoperation")

const createController = async (MODELNAME, dataSchema, req, res, next) => {
  try {
    const data = {}
    dataSchema.forEach((item) => {
      data[item] = req.body[item]
    })
    const newRecord = await create(MODELNAME.english, data)
    resposeHandler(res, newRecord, Created(MODELNAME.persian))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

const readController = async (MODELNAME, req, res, next) => {
  try {
    const { id, page } = req.query
    const where = id ? { id: +id } : null
    const records = await read(MODELNAME.english, where, page || 1)
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
      next(
        createError(BadRequest(`${MODELNAME.persian} با این شناسه وجود ندارد`))
      )
    else next(createError(InternalServerError()))
  }
}

module.exports = (MODELNAME) => ({
  createController: createController.bind(null, MODELNAME),
  readController: readController.bind(null, MODELNAME),
  updateConrtoller: updateConrtoller.bind(null, MODELNAME),
  deleteController: deleteController.bind(null, MODELNAME),
})
