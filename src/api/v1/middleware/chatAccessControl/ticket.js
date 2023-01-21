const { modelName } = require("../../../../config/Constant")
const { createError } = require("../../helpers/Functions")
const { BadRequest, Forbidden } = require("../../helpers/HttpResponse")
const { readOne } = require("../../helpers/prisma")
const { internalServerErrorHandler } = require("../../helpers/responseHandler")
const { teamModelName, ticketModelName, ticketMessageModelName } = modelName

module.exports.accessToTicket = async (req, res, next) => {
  try {
    const ticketId = req.body?.ticketId || req.params?.id || req.query?.id

    if (!ticketId)
      return next(createError(BadRequest("شناسه تیکت مورد نظر ارسال نشده است")))
    const ticket = await readOne(ticketModelName.english, { id: +ticketId })
    if (!ticket)
      return next(
        createError(BadRequest("شناسه تیکت ارسال شده معتبر نمی باشد"))
      )

    const { id: teamId } = req[teamModelName.english]
    const { teamId: ticketTeamId } = ticket

    if (teamId === ticketTeamId) {
      req[ticketModelName.english] = ticket
      next()
    } else return next(createError(Forbidden()))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.accessToTicketMessage = async (req, res, next) => {
  try {
    const ticketMessageId =
      req.body?.ticketMessageId || req.params?.id || req.query?.id
    const { id: ticketId } = req[ticketModelName.english]

    if (!ticketMessageId)
      return next(
        createError(BadRequest("شناسه پیام تیکت مورد نظر ارسال نشده است"))
      )
    const ticketMessage = await readOne(ticketMessageModelName.english, {
      id: +ticketMessageId,
      ticketId: ticketId,
    })
    if (ticketMessage) next()
    else return next(createError(Forbidden()))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
