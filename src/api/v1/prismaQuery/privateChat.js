const { PrismaClient } = require("@prisma/client")
const { privateChatMessage } = new PrismaClient()

module.exports.getPrivateChatMessages = async (privateChatId) => {
  try {
    return privateChatMessage.findMany({
      where: { privateChatId },
      orderBy: {
        date: "asc",
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.markAsReadmessages = async (messageIds, isReadWithTeamOne) => {
  try {
    if (isReadWithTeamOne)
      await privateChatMessage.updateMany({
        where: {
          id: {
            in: messageIds,
          },
        },
        data: {
          isReadWithTeamOne: true,
        },
      })
    else
      await privateChatMessage.updateMany({
        where: {
          id: {
            in: messageIds,
          },
        },
        data: {
          isReadWithTeamTwo: true,
        },
      })
  } catch (error) {
    throw error
  }
}
