const { PrismaClient } = require("@prisma/client")
const { championsCup } = new PrismaClient()

module.exports.getChampionsCupAndSortedChampionsGames = async () => {
  try {
    const championsCupWithSortedGames = await championsCup.findFirst({
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

module.exports.updateChampionsCupPrismaQuery = (
  championsCupId,
  firstTeamId,
  secondTeamId,
  teamIds,
  games
) => {
  return championsCup.update({
    where: {
      id: championsCupId,
    },
    data: {
      firstTeamId,
      secondTeamId,
      ...(teamIds && {
        teams: { set: teamIds.map((teamId) => ({ id: teamId })) },
      }),
      ...(games && {
        games: {
          createMany: {
            data: games,
          },
        },
      }),
    },
  })
}

module.exports.createChampionsCupPrismaQuery = (teamIds, games) => {
  return championsCup.create({
    data: {
      ...(teamIds && {
        teams: {
          connect: teamIds.map((teamId) => ({
            id: teamId,
          })),
        },
      }),
      ...(games && {
        games: {
          createMany: {
            data: games,
          },
        },
      }),
    },
  })
}

module.exports.addChampionsCupGamesPrismaQuery = (newGames, championsCupId) => {
  try {
    return championsCup.update({
      where: {
        id: championsCupId,
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

module.exports.removeTopTwoTeamFromChampionsLeagu = () => {
  try {
    return championsCup.updateMany({
      data: {
        firstTeamId: null,
        secondTeamId: null,
      },
    })
  } catch (error) {
    throw error
  }
}
