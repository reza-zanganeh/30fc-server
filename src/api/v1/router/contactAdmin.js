const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { modelName, paginationTake } = require("../../../config/Constant")
const { ticketModelName, ticketMessageModelName, contactUsModelName } =
  modelName
const { takeMedium } = paginationTake
const {
  contactUs,
  responseToContactUsMessage,
  sendTicketMessageByTeam,
  sendTicketMessageByAdmin,
  getMyTickets,
  getTicketMessages,
} = require("../controller/contactAdmin")

const {
  createController: createTicket,
  readController: readTickets,
  deleteController: deleteTicket,
} = require("../helpers/controllerCRUDoperation")(ticketModelName)

const { updateConrtoller: updateTicketMessage } =
  require("../helpers/controllerCRUDoperation")(ticketMessageModelName)

const {
  readRecordsSortedByDateWithPaginationController: getContactUsMessages,
} = require("../helpers/controllerCRUDoperation")(contactUsModelName)

const { isAuthenticate } = require("../middleware/athentication")
const {
  accessToTicket,
  accessToTicketMessage,
} = require("../middleware/chatAccessControl/ticket")

const { checkCaptcha } = require("../middleware/checkCaptcha")
const {
  hasAccessToAdminOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl")
const {
  contactUsSchemaValidation,
  responseToContactUsMessageSchemaValidation,
  createTicketSchemaValidation,
  sendOrEditTicketMessageSchemaValidation,
} = require("../validations/contactAdmin")

const contactAdminRouter = express.Router()

contactAdminRouter.post(
  "/contact-us",
  checkCaptcha,
  checkSchema(contactUsSchemaValidation),
  expressValidationResultHandler,
  contactUs
)

contactAdminRouter.post(
  "/response-to-contact-us",
  isAuthenticate,
  hasAccessToAdminOperation,
  checkSchema(responseToContactUsMessageSchemaValidation),
  expressValidationResultHandler,
  responseToContactUsMessage
)

contactAdminRouter.get(
  "/contact-us",
  isAuthenticate,
  hasAccessToAdminOperation,
  getContactUsMessages.bind(null, takeMedium)
)

// ticket
contactAdminRouter.post(
  "/ticket",
  isAuthenticate,
  hasAccessToTeam,
  checkSchema(createTicketSchemaValidation),
  expressValidationResultHandler,
  createTicket.bind(null, ["title", "teamId"])
)

contactAdminRouter.post(
  "/ticket/message",
  isAuthenticate,
  hasAccessToTeam,
  accessToTicket,
  checkSchema(sendOrEditTicketMessageSchemaValidation),
  expressValidationResultHandler,
  sendTicketMessageByTeam
)

contactAdminRouter.post(
  "/ticket/admin/message",
  isAuthenticate,
  hasAccessToAdminOperation,
  checkSchema(sendOrEditTicketMessageSchemaValidation),
  expressValidationResultHandler,
  sendTicketMessageByAdmin
)

contactAdminRouter.get(
  "/admin/ticket",
  isAuthenticate,
  hasAccessToAdminOperation,
  readTickets
)

contactAdminRouter.get("/ticket", isAuthenticate, hasAccessToTeam, getMyTickets)

contactAdminRouter.get(
  "/ticket-messages",
  isAuthenticate,
  hasAccessToTeam,
  accessToTicket,
  getTicketMessages
)

contactAdminRouter.get(
  "/admin/ticket-messages",
  isAuthenticate,
  hasAccessToAdminOperation,
  getTicketMessages
)

contactAdminRouter.delete(
  "/ticket/:id",
  isAuthenticate,
  hasAccessToTeam,
  accessToTicket,
  deleteTicket
)

contactAdminRouter.patch(
  "/ticket-message:/id",
  isAuthenticate,
  hasAccessToTeam,
  accessToTicket,
  accessToTicketMessage,
  checkSchema(sendOrEditTicketMessageSchemaValidation),
  expressValidationResultHandler,
  updateTicketMessage.bind(null, ["message"])
)

contactAdminRouter.patch(
  "/admin/ticket-message:/id",
  isAuthenticate,
  hasAccessToAdminOperation,
  checkSchema(sendOrEditTicketMessageSchemaValidation),
  expressValidationResultHandler,
  updateTicketMessage.bind(null, ["message"])
)

module.exports.contactAdminRouter = contactAdminRouter
