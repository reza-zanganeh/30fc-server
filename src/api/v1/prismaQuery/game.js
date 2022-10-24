const { PrismaClient } = require("@prisma/client")
const { leagueGame, leagueGameScorerPlayer } = new PrismaClient()

module.exports.deleteAllDoneLeaguGames = async () => {
  try {
    await leagueGameScorerPlayer.deleteMany()
    await leagueGame.deleteMany({
      where: { result: { not: { equals: "undone" } } },
    })
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
