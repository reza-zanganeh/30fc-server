const {
  create,
  createPrismaQueryPool,
  addPrismaQueryToPool,
  updateWithoutExecute,
  prismaTransaction,
  readAll,
} = require("../helpers/prisma")
const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
const { modelName } = require("../../../config/Constant")
const { Ok, BadRequest } = require("../helpers/HttpResponse")
const { sendTicketMessage } = require("../modelHelperFunction/contactAdmin")
const { createError } = require("../helpers/Functions")
const {
  contactUsModelName,
  teamModelName,
  ticketModelName,
  ticketMessageModelName,
} = modelName
// contact us with user that not loggedin
module.exports.contactUs = async (req, res, next) => {
  try {
    const { fullname, phonenumber, messageTitle, messageContext } = req.body

    await create(contactUsModelName.english, {
      fullname,
      phonenumber,
      messageContext,
      messageTitle,
    })

    resposeHandler(
      res,
      {},
      Ok({
        message:
          "پیام شما با موفقیت ارسال شد در اسرع وقت ادمین سایت از طریق پیامک به شما پاسخ خواهد داد",
      })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// admin response with sms
// TODO : when give sms panel
module.exports.responseToContactUsMessage = async (req, res, next) => {}
module.exports.sendTicketMessageByTeam = async (req, res, next) => {
  try {
    const { message } = req.body
    const { id: ticketId, turn } = req[ticketModelName.english]

    if (turn === "Admin")
      return next(createError(BadRequest("لطفا منتظر پاسخ ادمین بمانید")))

    const sendTicketMessagePrismaPoolIndex = createPrismaQueryPool()

    sendTicketMessage(
      "Team",
      message,
      ticketId,
      sendTicketMessagePrismaPoolIndex
    )

    await prismaTransaction(sendTicketMessagePrismaPoolIndex)

    resposeHandler(res, {}, Ok({ operationName: "ارسال پیام در تیکت" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
module.exports.sendTicketMessageByAdmin = async (req, res, next) => {
  try {
    const { message } = req.body
    const { id: ticketId } = req[ticketModelName.english]

    if (turn === "Team")
      return next(createError(BadRequest("لطفا منتظر پاسخ تیم بمانید")))

    const sendTicketMessagePrismaPoolIndex = createPrismaQueryPool()

    sendTicketMessage(
      "Admin",
      message,
      ticketId,
      sendTicketMessagePrismaPoolIndex
    )

    await prismaTransaction(sendTicketMessagePrismaPoolIndex)

    resposeHandler(res, {}, Ok({ operationName: "ارسال پاسخ در تیکت" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
module.exports.getMyTickets = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]

    const tickets = await readAll(ticketModelName.english, { teamId: teamId })

    resposeHandler(res, tickets, emptyMesssage())
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
