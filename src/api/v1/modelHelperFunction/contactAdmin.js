const { modelName } = require("../../../config/Constant")
const {
  addPrismaQueryToPool,
  updateWithoutExecute,
  createWithoutExecute,
} = require("../helpers/prisma")
const { ticketModelName, ticketMessageModelName } = modelName
module.exports.sendTicketMessage = (
  writer,
  message,
  ticketId,
  prismaPoolIndex
) => {
  try {
    addPrismaQueryToPool(
      prismaPoolIndex,
      updateWithoutExecute(
        ticketModelName.english,
        { id: ticketId },
        { turn: writer === "Admin" ? "Team" : "Admin" }
      )
    )
    addPrismaQueryToPool(
      prismaPoolIndex,
      createWithoutExecute(ticketMessageModelName.english, {
        message,
        writer,
        ticketId,
      })
    )
  } catch (error) {
    throw error
  }
}
