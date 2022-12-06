const { PrismaClient } = require("@prisma/client")
const { addPrismaQueryToPool } = require("../helpers/prisma")
const {
  leagueGame,
  leagueGameScorerPlayer,
  championsCupGame,
  championsCupGameScorerPlayer,
  goldenCupGame,
  goldenCupGameScorerPlayer,
} = new PrismaClient()

// league games
module.exports.deleteAllLeaguGames = (prismaPoolIndex) => {
  try {
    addPrismaQueryToPool(prismaPoolIndex, leagueGameScorerPlayer.deleteMany())
    addPrismaQueryToPool(prismaPoolIndex, leagueGame.deleteMany())
  } catch (error) {
    throw error
  }
}

module.exports.getLeagueGamesThatPassedStartTime = async () => {
  try {
    const games = await leagueGame.findMany({
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

module.exports.playingLeagueGame = (leagueGameId, data) => {
  try {
    const {
      result,
      resultDescription,
      winerTeamGoalCount,
      loserGoalCount,
      playerHasReceivedRedCartId,
      playerOneHasReceivedYellowCartId,
      playerTwoHasReceivedYellowCartId,
      injuredPlayerId,
      bestPlayerId,
    } = data

    return leagueGame.update({
      where: {
        id: leagueGameId,
      },
      data: {
        result,
        resultDescription,
        winerTeamGoalCount,
        loserGoalCount,
        playerHasReceivedRedCartId,
        playerOneHasReceivedYellowCartId,
        playerTwoHasReceivedYellowCartId,
        injuredPlayerId,
        bestPlayerId,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.connectScorerPlayerToLeagueGame = (
  leagueGameId,
  scorerPlayersId
) => {
  try {
    return leagueGameScorerPlayer.createMany({
      data: scorerPlayersId.map((playerId) => ({
        leagueGameId,
        playerId,
      })),
    })
  } catch (error) {
    throw error
  }
}

// champions cup game
module.exports.deleteAllChampionsCupGames = (prismaPoolIndex) => {
  try {
    addPrismaQueryToPool(
      prismaPoolIndex,
      championsCupGameScorerPlayer.deleteMany()
    )
    addPrismaQueryToPool(prismaPoolIndex, championsCupGame.deleteMany())
  } catch (error) {
    throw error
  }
}

module.exports.connectScorerPlayerToChampionsCupGame = (
  championsCupGameId,
  scorerPlayersId
) => {
  try {
    return championsCupGameScorerPlayer.createMany({
      data: scorerPlayersId.map((playerId) => ({
        championsCupGameId,
        playerId,
      })),
    })
  } catch (error) {
    throw error
  }
}

module.exports.playingChampionsCupGame = (championsCupId, data) => {
  try {
    const {
      result,
      resultDescription,
      winerTeamGoalCount,
      loserGoalCount,
      playerHasReceivedRedCartId,
      playerOneHasReceivedYellowCartId,
      playerTwoHasReceivedYellowCartId,
      injuredPlayerId,
      bestPlayerId,
    } = data

    return championsCupGame.update({
      where: {
        id: championsCupId,
      },
      data: {
        result,
        resultDescription,
        winerTeamGoalCount,
        loserGoalCount,
        playerHasReceivedRedCartId,
        playerOneHasReceivedYellowCartId,
        playerTwoHasReceivedYellowCartId,
        injuredPlayerId,
        bestPlayerId,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getChampionsCupGamesThatPassedStartTime = async () => {
  try {
    const games = await championsCupGame.findMany({
      where: {
        AND: [
          { result: { equals: "undone" } },
          { startTime: { lte: new Date().toISOString() } },
        ],
      },
      orderBy: {
        id: "asc",
      },
    })
    return games
  } catch (error) {
    throw error
  }
}

// champions cup game
module.exports.deleteGoldenCupGames = (prismaPoolIndex) => {
  try {
    addPrismaQueryToPool(
      prismaPoolIndex,
      goldenCupGameScorerPlayer.deleteMany()
    )
    addPrismaQueryToPool(prismaPoolIndex, championsCupGame.deleteMany())
  } catch (error) {
    throw error
  }
}

// golden cup
module.exports.connectScorerPlayerToGoldenCupGame = (
  goldenCupGameId,
  scorerPlayersId
) => {
  try {
    return goldenCupGameScorerPlayer.createMany({
      data: scorerPlayersId.map((playerId) => ({
        goldenCupGameId,
        playerId,
      })),
    })
  } catch (error) {
    throw error
  }
}

module.exports.playingGoldenCupGame = (goldenCupId, data) => {
  try {
    const {
      result,
      resultDescription,
      winerTeamGoalCount,
      loserGoalCount,
      playerHasReceivedRedCartId,
      playerOneHasReceivedYellowCartId,
      playerTwoHasReceivedYellowCartId,
      injuredPlayerId,
      bestPlayerId,
    } = data

    return championsCupGame.update({
      where: {
        id: goldenCupId,
      },
      data: {
        result,
        resultDescription,
        winerTeamGoalCount,
        loserGoalCount,
        playerHasReceivedRedCartId,
        playerOneHasReceivedYellowCartId,
        playerTwoHasReceivedYellowCartId,
        injuredPlayerId,
        bestPlayerId,
      },
    })
  } catch (error) {
    throw error
  }
}
