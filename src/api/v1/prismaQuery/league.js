const { PrismaClient } = require("@prisma/client")
const { league } = new PrismaClient()

module.exports.getLeaguesPrismaQuery = async () => {
  try {
    const leagues = await league.findMany({
      select: {
        id: true,
        group: true,
        level: true,
        teams: {
          select: {
            id: true,
            isBlock: true,
          },
          orderBy: {
            teamScores: {
              scoreInLeague: "asc",
            },
          },
        },
      },
      orderBy: {
        group: "asc",
      },
    })
    return leagues
  } catch (error) {
    throw error
  }
}

module.exports.updateLeaguePrismaQuery = async (
  leagueId,
  teamIds,
  firstTeamId,
  secondTeamId,
  thirdTeamId,
  games
) => {
  try {
    const updatedLeague = await league.update({
      where: { id: leagueId },
      data: {
        teams: { set: teamIds },
        firstTeam: { connect: { id: firstTeamId } },
        secondTeam: { connect: { id: secondTeamId } },
        thirdTeam: { connect: { id: thirdTeamId } },
        teamCount: teamIds.length,
        ...(games && {
          games: {
            createMany: {
              data: games,
            },
          },
        }),
      },
    })
    return updatedLeague
  } catch (error) {
    throw error
  }
}

module.exports.createNewLeaguePrismaQuery = async (
  level,
  group,
  teamIds,
  games
) => {
  try {
    const newCreatedLeague = await league.create({
      data: {
        level,
        group,
        teams: { connect: teamIds },
        games: {
          createMany: {
            data: games,
          },
        },
      },
    })
    return newCreatedLeague
  } catch (error) {
    throw error
  }
}

module.exports.deleteLeagueWithoutComplateTeams = async () => {
  try {
    await league.deleteMany({
      where: {
        teamCount: { lt: 14 },
      },
    })
  } catch (error) {
    throw error
  }
}
