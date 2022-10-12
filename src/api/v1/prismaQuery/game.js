const { PrismaClient, prisma } = require("@prisma/client")
const { leagueGame } = new PrismaClient()

module.exports.deleteAllDoneLeaguGames = async () => {
  try {
    await leagueGame.deleteMany({
      where: { result: { not: { equals: "undone" } } },
    })
  } catch (error) {
    throw error
  }
}
