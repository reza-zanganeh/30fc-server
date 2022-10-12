const { PrismaClient, prisma } = require("@prisma/client")
const { team } = new PrismaClient()

module.exports.createTeamPrismaQuery = async (
  name,
  ownerId,
  compositionId,
  strategy,
  technique,
  players
) => {
  try {
    const createdTeam = await team.create({
      data: {
        name,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        composition: {
          connect: {
            id: compositionId,
          },
        },
        strategy,
        technique,
        coinCount: 1000,
        players: {
          createMany: {
            data: players,
          },
        },
        teamAssets: {
          create: {},
        },
        teamScores: {
          create: {},
        },
      },
    })
    return createdTeam
  } catch (error) {
    throw error
  }
}

module.exports.createTeamWithOwnerPrismaQuery = async (
  teamName,
  compositionId,
  strategy,
  technique,
  players,
  owner
) => {
  try {
    const createdTeam = await team.create({
      data: {
        name: teamName,
        owner: {
          create: owner,
        },
        composition: {
          connect: {
            id: compositionId,
          },
        },
        strategy,
        technique,
        coinCount: 1000,
        players: {
          createMany: {
            data: players,
          },
        },
        teamAssets: {
          create: {},
        },
        teamScores: {
          create: {},
        },
      },
    })
    return createdTeam
  } catch (error) {
    throw error
  }
}

module.exports.getPlayersPrismaQuery = async (teamId) => {
  try {
    const players = team.findFirst({
      where: {
        id: +teamId,
      },
      include: {
        players: {
          orderBy: {
            id: "asc",
          },
        },
      },
    })
    return players
  } catch (error) {
    throw error
  }
}

module.exports.changeCompositionPrismaQuery = async (
  teamId,
  compositionId,
  newPlayerPosition
) => {
  try {
    const updatedTeam = await team.update({
      where: {
        id: teamId,
      },
      data: {
        composition: {
          connect: { id: compositionId },
        },
        players: {
          updateMany: newPlayerPosition.map((player) => ({
            where: { id: player.id },
            data: {
              positionInMainCompositionId: player.positionInMainCompositionId,
            },
          })),
        },
      },
    })
    return updatedTeam
  } catch (error) {
    throw error
  }
}

module.exports.changeTwoPlayerPositionPrismaQuery = async (
  teamId,
  playerOne,
  playerTwo
) => {
  try {
    const result = await team.update({
      where: {
        id: teamId,
      },
      data: {
        players: {
          updateMany: [
            {
              where: { id: +playerOne.id },
              data: {
                positionInMainCompositionId:
                  playerTwo.positionInMainCompositionId,
              },
            },
            {
              where: { id: +playerTwo.id },
              data: {
                positionInMainCompositionId:
                  playerOne.positionInMainCompositionId,
              },
            },
          ],
        },
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateTeamPlayersPrismaQuery = async (
  teamId,
  updatedTeamData,
  updatedPlayersData
) => {
  try {
    const updatedTeam = await team.update({
      where: {
        id: teamId,
      },
      data: {
        ...updatedTeamData,
        players: {
          updateMany: updatedPlayersData.map((player) => {
            const playerId = player.id
            delete player.id
            return {
              where: { id: playerId },
              data: { ...player },
            }
          }),
        },
      },
    })
    return updatedTeam
  } catch (error) {
    throw error
  }
}

module.exports.getNewUnBlockedTeam = async () => {
  try {
    return team.findMany({
      where: {
        AND: [{ leagueId: { equals: null } }, { isBlock: { equals: false } }],
      },
      select: { id: true },
      orderBy: {
        id: "asc",
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getUnBlockTeamsInleagues = async () => {
  try {
    const teams = await team.findMany({
      where: {
        AND: [{ isBlock: false }, { leagueId: { not: { equals: null } } }],
      },
      select: {
        id: true,
        isBlock: true,
        lastTimeSeen: true,
      },
    })
    return teams
  } catch (error) {
    throw error
  }
}

module.exports.blockTeamsPrismaQuery = async (teamIds) => {
  try {
    await team.updateMany({
      where: { id: { in: teamIds } },
      data: { isBlock: true },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getComplateInfoAboutSponserAndScoresTopThreeTeams = async (
  firstTeamId,
  secondTeamId,
  thirdTeamId
) => {
  try {
    const topTeams = await team.findMany({
      where: {
        id: {
          in: [firstTeamId, secondTeamId, thirdTeamId],
        },
      },
      select: {
        id: true,
        coinCount: true,
        teamScores: {
          select: {
            firstTeamInLeagueCupCount: true,
            secondTeamInLeagueCupCount: true,
            thirdTeamInLeagueCupCount: true,
            scoreInTournament: true,
          },
        },
        sponser: {
          select: {
            firstInLeagueCoinCount: true,
            secondInLeagueCoinCount: true,
            thirdInLeagueCoinCount: true,
            topScorerCoinCount: true,
          },
        },
        tournament: {
          select: {
            firstTeamInLeaguePoints: true,
            secondTeamInLeagePoints: true,
            thirdTeamInLeaguePoints: true,
          },
        },
      },
      orderBy: {
        teamScores: {
          scoreInLeague: "asc",
        },
      },
    })
    return topTeams
  } catch (error) {
    throw error
  }
}
