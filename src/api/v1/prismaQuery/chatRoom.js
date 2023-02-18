const { PrismaClient } = require("@prisma/client")
const { chatRoom } = new PrismaClient()

module.exports.createChatRoomPrismaQuery = async (name, teamIds) => {
  try {
    const newChatRoom = await chatRoom.create({
      data: {
        name,
        members: {
          connect: teamIds,
        },
      },
    })
    return newChatRoom
  } catch (error) {
    throw error
  }
}

module.exports.addMemberToChatRoom = async (chatRoomId, memberId) => {
  try {
    await chatRoom.update({
      where: { id: chatRoomId },
      data: { members: { connect: { id: memberId } } },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getDefaultChatRoomId = async () => {
  try {
    const defaultChatRoomId = await chatRoom.findFirst({
      where: {
        isDefaultChatRoom: true,
      },
      select: {
        id: true,
      },
    })
    return defaultChatRoomId
  } catch (error) {
    throw error
  }
}
