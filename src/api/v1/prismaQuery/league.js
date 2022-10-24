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
            teamScores: {
              select: {
                scoreInLeague: true,
              },
            },
          },
          orderBy: {
            teamScores: {
              scoreInLeague: "desc",
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

module.exports.updateLeaguePrismaQuery = (
  leagueId,
  teamIds,
  firstTeamId,
  secondTeamId,
  thirdTeamId,
  games
) => {
  try {
    return league.update({
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
  } catch (error) {
    throw error
  }
}

module.exports.createNewLeaguePrismaQuery = (level, group, teamIds, games) => {
  try {
    return league.create({
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
  } catch (error) {
    throw error
  }
}

module.exports.deleteLeagueWithoutComplateTeams = () => {
  try {
    return league.deleteMany({
      where: {
        teamCount: { lt: 14 },
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.removeTopThreeLeaguTeamsPrismaQuery = () => {
  try {
    return league.updateMany({
      data: {
        firstTeamId: null,
        secondTeamId: null,
        thirdTeamId: null,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getLeagueTablePrismaQuery = (leagueId) => {
  try {
    return league.findFirst({
      where: { id: leagueId },
      select: {
        teams: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            teamScores: {
              select: {
                equalCountInLeague: true,
                winCountInLeague: true,
                loseCountInLeague: true,
                scoreInLeague: true,
              },
            },
          },
          orderBy: {
            teamScores: {
              scoreInLeague: "desc",
            },
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}
