const { createError } = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  Created,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const {
  createReservedTeamName,
  deleteReservedTeamName,
  readReservedTeamName,
  updateReservedTeamName,
} = require("../dataLogic/reservedTeamName")
module.exports.createReservedTeamName = async (req, res, next) => {
  try {
    const { name } = req.body

    const newReservedTeamName = await createReservedTeamName(name)

    resposeHandler(res, newReservedTeamName, Created("نام تیم رزرو شده"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
module.exports.readReservedTeamName = async (req, res, next) => {
  try {
    const { id, page } = req.query
    const reservedTeamName = await readReservedTeamName(id, page || 1)
    resposeHandler(res, reservedTeamName, Ok("خواندن نام تیم رزرو شده"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
module.exports.updateReservedTeamName = async (req, res, next) => {
  try {
    const { id } = req.params
    const { newName } = req.body
    const updatedReservedTeamName = await updateReservedTeamName(id, newName)
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
    const deletedReservedTeamName = await deleteReservedTeamName(id)
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
