const { PrismaClient } = require("@prisma/client")
const { goldenCup } = new PrismaClient()
module.exports.addTeamToGoldenCupPrismaQuery = (goldenCupId, teamId) => {
  try {
    return goldenCup.update({
      where: { id: goldenCupId },
      data: {
        teams: {
          connect: {
            id: teamId,
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.addGoldenCupGamesPrismaQuery = (newGames, goldenCupId) => {
  try {
    return goldenCup.update({
      where: {
        id: goldenCupId,
      },
      data: {
        games: {
          createMany: {
            data: newGames,
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getEndOfRegisterationGoldenCup = async () => {
  try {
    const endOfRegisterationGoldenCup = await goldenCup.findMany({
      where: {
        status: { equals: "EndOfRegisteration" },
      },
      select: {
        id: true,
        teamCount: true,
        teams: {
          select: {
            id: true,
          },
        },
      },
    })
    return endOfRegisterationGoldenCup
  } catch (error) {
    throw error
  }
}

module.exports.startGoldenCupPrismaQuery = (goldenCupId, teamIds, games) => {
  try {
    return goldenCup.update({
      where: {
        id: goldenCupId,
      },
      data: {
        teams: { set: teamIds },
        games: {
          createMany: {
            data: games,
          },
        },
        status: "Running",
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getGoldenCupAndSortedChampionsGames = async () => {
  try {
    const championsCupWithSortedGames = await goldenCup.findMany({
      where: {
        status: "Ended",
      },
      select: {
        id: true,
        games: {
          select: {
            id: true,
            hostTeamId: true,
            result: true,
            visitingTeamId: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    })
    return championsCupWithSortedGames
  } catch (error) {
    throw error
  }
}

module.exports.getGoldenCupsWithGamesThatPassedStartTime = async () => {
  try {
    const games = await goldenCup.findMany({
      select: {
        id: true,
        games: {
          where: {
            AND: [
              { result: { equals: "undone" } },
              // { startTime: { lte: new Date().toISOString() } },
            ],
          },
          orderBy: {
            id: "asc",
          },
          select: {
            id: true,
            visitingTeamId: true,
            hostTeamId: true,
          },
        },
      },
    })
    goldenCup
    return games
  } catch (error) {
    throw error
  }
}
