const { createError } = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")

const {
  create,
  read,
  update,
  remove,
} = require("../helpers/prismaCRUDoperation")

const MODELNAME = "reservedTeamName"

module.exports.createReservedTeamName = async (req, res, next) => {
  try {
    const { name } = req.body

    const newReservedTeamName = await create(MODELNAME, { name })

    resposeHandler(res, newReservedTeamName, Created("نام تیم رزرو شده"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
module.exports.readReservedTeamName = async (req, res, next) => {
  try {
    const { id, page } = req.query
    const where = id ? { id: +id } : null
    const reservedTeamName = await read(MODELNAME, where, page || 1)
    resposeHandler(res, reservedTeamName, Ok("خواندن نام تیم رزرو شده"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
module.exports.updateReservedTeamName = async (req, res, next) => {
  try {
    const { id } = req.params
    const { newName } = req.body
    const updatedReservedTeamName = await update(
      MODELNAME,
      { id: +id },
      { name: newName }
    )
    resposeHandler(
      res,
      updatedReservedTeamName,
      Created("بروزرسانی نام تیم رزرو شده")
    )
  } catch (error) {
    if (error.code === "P2025")
      next(createError(BadRequest("نام تیم رزرو شده با این شناسه وجود ندارد")))
    else next(createError(InternalServerError()))
  }
}
module.exports.deleteReservedTeamName = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedReservedTeamName = await remove(MODELNAME, { id: +id })
    resposeHandler(
      res,
      deletedReservedTeamName,
      Created("حذف نام تیم رزرو شده")
    )
  } catch (error) {
    if (error.code === "P2025")
      next(createError(BadRequest("نام تیم رزرو شده با این شناسه وجود ندارد")))
    else next(createError(InternalServerError()))
  }
}
