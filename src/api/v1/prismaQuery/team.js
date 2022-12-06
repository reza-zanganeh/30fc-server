const { PrismaClient } = require("@prisma/client")
const { addPrismaQueryToPool } = require("../helpers/prisma")
const { team, teamScores, sponser } = new PrismaClient()

module.exports.createTeamPrismaQuery = async (
  name,
  ownerId,
  compositionId,
  strategy,
  technique,
  stadiumId,
  stadiumFacilitiesId,
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
          create: {
            stadiumId,
            stadiumFacilitiesId,
          },
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
  stadiumFacilitiesId,
  stadiumId,
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
          create: {
            stadiumId,
            stadiumFacilitiesId,
          },
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
            scoreInLeague: true,
            totalScore: true,
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
          scoreInLeague: "desc",
        },
      },
    })
    return topTeams
  } catch (error) {
    throw error
  }
}

module.exports.getInformationTeamNeedForPlayGame = async (teamId) => {
  try {
    const result = await team.findFirst({
      where: { id: teamId },
      select: {
        id: true,
        isBlock: true,
        strategy: true,
        technique: true,
        spirit: true,
        name: true,
        fanSatisfaction: true,
        coinCount: true,
        players: {
          where: { inTeamMainComposition: { equals: true } },
          select: {
            id: true,
            position: {
              select: {
                major: true,
                manor: true,
              },
            },
            positionInMainComposition: {
              select: {
                major: true,
                manor: true,
              },
            },
            age: true,
            energy: true,
            injury: true,
            totalPower: true,
            yellowCartInLeagueGameCount: true,
            yellowCartInFriendlyGameCount: true,
            yellowCartInChampionsCupGameCount: true,
            yellowCartInGoldCupGameCount: true,
            hasRedCartInChampionsCupGame: true,
            hasRedCartInFriendlyGame: true,
            hasRedCartInGoldCupGame: true,
            hasRedCartInLeagueGame: true,
            goalCountInLeague: true,
          },
        },
        teamScores: {
          select: {
            scoreInLeague: true,
            winCountInLeague: true,
            loseCountInLeague: true,
            equalCountInLeague: true,
            totalEqualCount: true,
            totalLoseCount: true,
            totalWinCount: true,
            totalScore: true,
            scoreInTournament: true,
          },
        },
        teamAssets: {
          select: {
            stadium: {
              select: {
                capacity: true,
              },
            },
            stadiumFacilities: {
              select: {
                win: true,
                lose: true,
                equal: true,
              },
            },
          },
        },
        tournament: {
          select: {
            winOfficialGamePoints: true,
            equalOfficialGamePoints: true,
            winFriendlyGamePoints: true,
            equalFriendlyGamePoints: true,
            playGamePoints: true,
          },
        },
        sponser: {
          select: {
            id: true,
            totalCoinCount: true,
            winOfficialGameCoinCount: true,
          },
        },
      },
    })
    return result
  } catch (error) {
    throw error
  }
}

module.exports.resetTeamScoresInLeagu = () => {
  try {
    return teamScores.updateMany({
      data: {
        scoreInLeague: 0,
        winCountInLeague: 0,
        loseCountInLeague: 0,
        equalCountInLeague: 0,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.updateFirstTeamAndSecondTeamInChampionsCupPrismaQuery = async (
  firstTeamId,
  secondTeamId,
  prismaQueryPoolIndex
) => {
  try {
    const [firstTeam, secondTeam] = await team.findMany({
      where: {
        id: { in: [firstTeamId, secondTeamId] },
      },
      select: {
        coinCount: true,
        teamScores: {
          select: {
            championsCupCount: true,
            scoreInTournament: true,
          },
        },
        sponser: {
          select: {
            id: true,
            totalCoinCount: true,
            championsCupChampionCoinCount: true,
          },
        },
        tournament: {
          select: {
            firstTeamInChampionsCupPoints: true,
            secondTeamInChampionsCupPoints: true,
          },
        },
      },
    })
    addPrismaQueryToPool(
      prismaQueryPoolIndex,
      team.update({
        where: {
          id: firstTeamId,
        },
        data: {
          teamScores: {
            update: {
              championsCupCount: firstTeam.teamScores.championsCupCount + 1,
              ...(firstTeam.tournament && {
                scoreInTournament:
                  firstTeam.teamScores.scoreInTournament +
                  firstTeam.tournament.firstTeamInChampionsCupPoints,
              }),
            },
          },
          ...(firstTeam.sponser && {
            coinCount:
              firstTeam.coinCount +
              firstTeam.sponser.championsCupChampionCoinCount,
          }),
        },
      })
    )
    addPrismaQueryToPool(
      prismaQueryPoolIndex,
      team.update({
        where: {
          id: secondTeamId,
        },
        data: {
          teamScores: {
            update: {
              ...(secondTeam.tournament && {
                scoreInTournament:
                  secondTeam.teamScores.scoreInTournament +
                  firstTeam.tournament.secondTeamInChampionsCupPoints,
              }),
            },
          },
        },
      })
    )
    addPrismaQueryToPool(
      prismaQueryPoolIndex,
      sponser.update({
        where: {
          id: firstTeam.sponser.id,
        },
        data: {
          totalCoinCount:
            firstTeam.sponser.totalCoinCount -
            firstTeam.sponser.goldCupChampionCoinCount,
        },
      })
    )
  } catch (error) {
    throw error
  }
}

module.exports.updateFirstTeamAndSecondTeamInGoldenCupPrismaQuery = async (
  firstTeamId,
  secondTeamId,
  prismaQueryPoolIndex
) => {
  try {
    const [firstTeam, secondTeam] = await team.findMany({
      where: {
        id: { in: [firstTeamId, secondTeamId] },
      },
      select: {
        coinCount: true,
        teamScores: {
          select: {
            goldCupCount: true,
            scoreInTournament: true,
          },
        },
        sponser: {
          select: {
            id: true,
            totalCoinCount: true,
            goldCupChampionCoinCount: true,
          },
        },
        tournament: {
          select: {
            firstTeamInGoldCupPoints: true,
            secondTeamInGoldCupPoints: true,
          },
        },
      },
    })
    addPrismaQueryToPool(
      prismaQueryPoolIndex,
      team.update({
        where: {
          id: firstTeamId,
        },
        data: {
          teamScores: {
            update: {
              goldCupCount: firstTeam.teamScores.goldCupCount + 1,
              ...(firstTeam.tournament && {
                scoreInTournament:
                  firstTeam.teamScores.scoreInTournament +
                  firstTeam.tournament.firstTeamInGoldCupPoints,
              }),
            },
          },
          ...(firstTeam.sponser && {
            coinCount:
              firstTeam.coinCount + firstTeam.sponser.goldCupChampionCoinCount,
          }),
        },
      })
    )
    addPrismaQueryToPool(
      prismaQueryPoolIndex,
      team.update({
        where: {
          id: secondTeamId,
        },
        data: {
          teamScores: {
            update: {
              ...(secondTeam.tournament && {
                scoreInTournament:
                  secondTeam.teamScores.scoreInTournament +
                  firstTeam.tournament.secondTeamInGoldCupPoints,
              }),
            },
          },
        },
      })
    )
    addPrismaQueryToPool(
      prismaQueryPoolIndex,
      sponser.update({
        where: {
          id: firstTeam.sponser.id,
        },
        data: {
          totalCoinCount:
            firstTeam.sponser.totalCoinCount -
            firstTeam.sponser.goldCupChampionCoinCount,
        },
      })
    )
  } catch (error) {
    throw error
  }
}
