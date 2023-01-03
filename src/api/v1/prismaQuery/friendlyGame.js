const { PrismaClient } = require("@prisma/client")
const { friendlyGame } = new PrismaClient()

module.exports.addFriendlyGamesPrismaQuery = (newGames) => {
  try {
    return friendlyGame.createMany({
      data: newGames.map((game) => ({
        hostTeamId: game.hostTeamId,
        visitingTeamId: game.visitingTeamId,
        startTime: game.startTime,
      })),
    })
  } catch (error) {
    throw error
  }
}

module.exports.getFriendlyGamesThatPassedStartTime = async () => {
  try {
    const games = await friendlyGame.findMany({
      where: {
        AND: [
          { result: { equals: "undone" } },
          { startTime: { lte: new Date().toISOString() } },
        ],
      },
    })
    return games
  } catch (error) {
    throw error
  }
}
