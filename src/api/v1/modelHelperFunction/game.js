const { modelName } = require("../../../config/Constant")
const {
  playerModelName,
  sponserModelName,
  teamModelName,
  teamScoresModelName,
} = modelName
const { getInformationTeamNeedForPlayGame } = require("../prismaQuery/team")
const { calculatePlayerPositionFactor } = require("../helpers/formula")
const {
  getDifferenceInPointsForEachGoalFactorFromRedis,
} = require("../services/redis")
const { createRandomNumber, headsOrTails } = require("../helpers/Functions")
const {
  getSuitablePlayersToReplacePrismaQuery,
} = require("../prismaQuery/player")
const {
  playingLeagueGame,
  connectScorerPlayerToLeagueGame,
} = require("../prismaQuery/game")
const {
  getGameCount,
  increaseGameCount,
  getNumberOfStadiumTicketCoinsFromRedis,
} = require("../services/redis")
const {
  updateWithoutExecute,
  prismaTransaction,
  addPrismaQueryToPool,
  createPrismaQueryPool,
} = require("../helpers/prisma")

const playerIsNotAllowedToPlayInLeaguGame = (
  gameType,
  hasRedCartInLeagueGame,
  yellowCartInLeagueGameCount
) =>
  gameType === "league" &&
  (hasRedCartInLeagueGame || +yellowCartInLeagueGameCount >= 2)

const playerIsNotAllowedToPlayInFriendlyGame = (
  gameType,
  hasRedCartInFriendlyGame,
  yellowCartInFriendlyGameCount
) =>
  gameType === "friendly" &&
  (hasRedCartInFriendlyGame || +yellowCartInFriendlyGameCount >= 2)

const playerIsNotAllowedToPlayInChmapionsCupGame = (
  gameType,
  hasRedCartInChampionsCupGame
) => gameType === "championsCup" && hasRedCartInChampionsCupGame

const playerIsNotAllowedToPlayInGoldenCup = (
  gameType,
  hasRedCartInGoldCupGame
) => gameType === "goldCup" && hasRedCartInGoldCupGame

const removePlayerRedCartOrYellowCartInLeaguGame = (
  playerId,
  hasRedCartInLeagueGame,
  yellowCartInLeagueGameCount
) => {
  return updateWithoutExecute(
    playerModelName.english,
    { id: playerId },
    {
      ...(hasRedCartInLeagueGame && {
        hasRedCartInLeagueGame: false,
      }),
      ...(+yellowCartInLeagueGameCount >= 2 && {
        yellowCartInLeagueGameCount: "0",
      }),
    }
  )
}

const removePlayerRedCartOrYellowCartInFriendlyGame = (
  playerId,
  hasRedCartInFriendlyGame,
  yellowCartInFriendlyGameCount
) => {
  try {
    return updateWithoutExecute(
      playerModelName.english,
      { id: playerId },
      {
        ...(hasRedCartInFriendlyGame && {
          hasRedCartInFriendlyGame: false,
        }),
        ...(+yellowCartInFriendlyGameCount >= 2 && {
          yellowCartInFriendlyGameCount: "0",
        }),
      }
    )
  } catch (error) {
    throw error
  }
}

const removePlayerRedCartInChampionsCupGame = (playerId) => {
  try {
    return updateWithoutExecute(
      playerModelName.english,
      { id: playerId },
      {
        hasRedCartInChampionsCupGame: false,
      }
    )
  } catch (error) {
    throw error
  }
}

const removePlayerRedCartInGoldenCup = (playerId) => {
  try {
    return updateWithoutExecute(
      playerModelName.english,
      { id: playerId },
      {
        hasRedCartInGoldCupGame: false,
      }
    )
  } catch (error) {
    throw error
  }
}

const findSuitablePlayerIndexWithPosition = (players, position) => {
  const { major, manor } = position
  const suitablePlayersWithSamePositionIndex = players.findIndex((player) => {
    return player.position.major === major && player.position.manor === manor
  })
  if (suitablePlayersWithSamePositionIndex !== -1)
    return suitablePlayersWithSamePositionIndex
  const suitablePlayersWithSameMajorPositionIndex = players.findIndex(
    (player) => {
      return player.position.major === major
    }
  )
  if (suitablePlayersWithSameMajorPositionIndex !== -1)
    return suitablePlayersWithSameMajorPositionIndex[0]
  return 0
}

const replacePlayersNotAallowedToPlay = async (
  teamId,
  players,
  gameType,
  prismaQueriesPlayGamePoolIndex
) => {
  try {
    const suitablePlayers = await getSuitablePlayersToReplacePrismaQuery(
      teamId,
      gameType
    )
    const alternativePlayers = []
    for (let i = 0; i < players.length; i++) {
      if (players[i].injury >= 100) {
        const alternativePlayerIndex = findSuitablePlayerIndexWithPosition(
          suitablePlayers,
          players[i].position
        )
        alternativePlayers.push({
          playerIndex: i,
          alternativePlayer: suitablePlayers[alternativePlayerIndex],
        })
        suitablePlayers.splice(alternativePlayerIndex, 1)
      } else if (
        playerIsNotAllowedToPlayInLeaguGame(
          gameType,
          players[i].hasRedCartInLeagueGame,
          players[i].yellowCartInLeagueGameCount
        )
      ) {
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          removePlayerRedCartOrYellowCartInLeaguGame(
            players[i].id,
            players[i].hasRedCartInLeagueGame,
            players[i].yellowCartInLeagueGameCount
          )
        )
        const alternativePlayerIndex = findSuitablePlayerIndexWithPosition(
          suitablePlayers,
          players[i].position
        )
        alternativePlayers.push({
          playerIndex: i,
          alternativePlayer: suitablePlayers[alternativePlayerIndex],
        })
        suitablePlayers.splice(alternativePlayerIndex, 1)
      } else if (
        playerIsNotAllowedToPlayInFriendlyGame(
          gameType,
          players[i].hasRedCartInFriendlyGame,
          players[i].yellowCartInFriendlyGameCount
        )
      ) {
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          removePlayerRedCartOrYellowCartInFriendlyGame(
            players[i].id,
            players[i].hasRedCartInFriendlyGame,
            players[i].yellowCartInFriendlyGameCount
          )
        )
        const alternativePlayerIndex = findSuitablePlayerIndexWithPosition(
          suitablePlayers,
          players[i].position
        )
        alternativePlayers.push({
          playerIndex: i,
          alternativePlayer: suitablePlayers[alternativePlayerIndex],
        })
        suitablePlayers.splice(alternativePlayerIndex, 1)
      } else if (
        playerIsNotAllowedToPlayInChmapionsCupGame(
          players[i].id,
          players[i].hasRedCartInChampionsCupGame
        )
      ) {
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          removePlayerRedCartInChampionsCupGame(players[i].id)
        )
        const alternativePlayerIndex = findSuitablePlayerIndexWithPosition(
          suitablePlayers,
          players[i].position
        )
        alternativePlayers.push({
          playerIndex: i,
          alternativePlayer: suitablePlayers[alternativePlayerIndex],
        })
        suitablePlayers.splice(alternativePlayerIndex, 1)
      } else if (
        playerIsNotAllowedToPlayInGoldenCup(
          gameType,
          players[i].hasRedCartInGoldCupGame
        )
      ) {
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          removePlayerRedCartInGoldenCup()
        )
        const alternativePlayerIndex = findSuitablePlayerIndexWithPosition(
          suitablePlayers,
          players[i].position
        )
        alternativePlayers.push({
          playerIndex: i,
          alternativePlayer: suitablePlayers[alternativePlayerIndex],
        })
        suitablePlayers.splice(alternativePlayerIndex, 1)
      }
    }
    return alternativePlayers
  } catch (error) {
    throw error
  }
}

const injuringOnePlayer = (
  hostTeamPlayers,
  visitingTeamPlayers,
  prismaQueriesPlayGamePoolIndex
) => {
  try {
    let injuredPlayerId
    const moreChance =
      hostTeamPlayers.length > visitingTeamPlayers.length ? 1 : 2
    const hostTeamOrVistingTeamForInjuredPlayer = headsOrTails(moreChance)
    if (hostTeamOrVistingTeamForInjuredPlayer === 1) {
      const randomPlayerIndexForInjuredPlayer = createRandomNumber(
        0,
        hostTeamPlayers.length - 1
      )
      injuredPlayerId = hostTeamPlayers[randomPlayerIndexForInjuredPlayer].id
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        updateWithoutExecute(
          playerModelName.english,
          {
            id: injuredPlayerId,
          },
          {
            injury: 100,
          }
        )
      )
      hostTeamPlayers.splice(randomPlayerIndexForInjuredPlayer, 1)
    } else {
      const randomPlayerIndexForInjuredPlayer = createRandomNumber(
        0,
        visitingTeamPlayers.length - 1
      )
      injuredPlayerId =
        visitingTeamPlayers[randomPlayerIndexForInjuredPlayer].id
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        updateWithoutExecute(
          playerModelName.english,
          {
            id: injuredPlayerId,
          },
          {
            injury: 100,
          }
        )
      )
      visitingTeamPlayers.splice(randomPlayerIndexForInjuredPlayer, 1)
    }
    return injuredPlayerId
  } catch (error) {
    throw error
  }
}

const givingRedCartToPlayer = (playerId, gameType) => {
  try {
    return updateWithoutExecute(
      playerModelName.english,
      { id: playerId },
      {
        ...(gameType === "league" && { hasRedCartInLeagueGame: true }),
        ...(gameType === "friendly" && { hasRedCartInFriendlyGame: true }),
        ...(gameType === "championsCup" && {
          hasRedCartInChampionsCupGame: true,
        }),
        ...(gameType === "goldCup" && { hasRedCartInGoldCupGame: true }),
      }
    )
  } catch (error) {
    throw error
  }
}

const givingRedCartToRandomPlayer = (
  hostTeamPlayers,
  visitingTeamPlayers,
  gameType,
  prismaQueriesPlayGamePoolIndex
) => {
  try {
    let playerHasReceivedRedCartId
    const moreChance =
      hostTeamPlayers.length > visitingTeamPlayers.length ? 1 : 2
    const hostTeamOrVistingTeamForRedCart = headsOrTails(moreChance)
    if (hostTeamOrVistingTeamForRedCart === 1) {
      const randomPlayerIndexForRedCart = createRandomNumber(
        0,
        hostTeamPlayers.length - 1
      )
      playerHasReceivedRedCartId =
        hostTeamPlayers[randomPlayerIndexForRedCart].id
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        givingRedCartToPlayer(playerHasReceivedRedCartId, gameType)
      )
      hostTeamPlayers.splice(randomPlayerIndexForRedCart, 1)
    } else {
      const randomPlayerIndexForRedCart = createRandomNumber(
        0,
        visitingTeamPlayers.length - 1
      )
      playerHasReceivedRedCartId =
        visitingTeamPlayers[randomPlayerIndexForRedCart].id
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        givingRedCartToPlayer(playerHasReceivedRedCartId, gameType)
      )
      visitingTeamPlayers.splice(randomPlayerIndexForRedCart, 1)
    }
    return playerHasReceivedRedCartId
  } catch (error) {
    throw error
  }
}

const givingYellowCartToPlayer = (
  player,
  gameType,
  prismaQueriesPlayGamePoolIndex
) => {
  try {
    let newYellowCartCount
    const playerReceivedYellowCartId = player.id
    if (gameType === "league") {
      newYellowCartCount = +player.yellowCartInLeagueGameCount + 1
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        updateWithoutExecute(
          playerModelName.english,
          { id: playerReceivedYellowCartId },
          {
            yellowCartInLeagueGameCount: `${newYellowCartCount}`,
          }
        )
      )
    } else if (gameType === "friendly") {
      newYellowCartCount = +player.yellowCartInFriendlyGameCount + 1
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        updateWithoutExecute(
          playerModelName.english,
          { id: playerReceivedYellowCartId },
          {
            yellowCartInFriendlyGameCount: `${newYellowCartCount}`,
          }
        )
      )
    } else if (gameType === "championsCup") {
      newYellowCartCount = player.hasRedCartInChampionsCupGame + 1
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        updateWithoutExecute(
          playerModelName.english,
          { id: playerReceivedYellowCartId },
          {
            hasRedCartInChampionsCupGame: newYellowCartCount,
          }
        )
      )
    } else if (gameType === "goldCup") {
      newYellowCartCount = player.hasRedCartInGoldCupGame + 1
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        updateWithoutExecute(
          playerModelName.english,
          { id: playerReceivedYellowCartId },
          {
            hasRedCartInGoldCupGame: newYellowCartCount,
          }
        )
      )
    }
    return newYellowCartCount
  } catch (error) {
    throw error
  }
}

const givingYellowCartToRandomPlayer = (
  hostTeamPlayers,
  visitingTeamPlayers,
  gameType,
  prismaQueriesPlayGamePoolIndex
) => {
  try {
    let playerReceivedYellowCartId, newYellowCartCount
    const moreChance =
      hostTeamPlayers.length > visitingTeamPlayers.length ? 1 : 2
    const hostTeamOrVistingTeamForRedCart = headsOrTails(moreChance)
    if (hostTeamOrVistingTeamForRedCart === 1) {
      const randomPlayerIndexForYellowCart = createRandomNumber(
        0,
        hostTeamPlayers.length - 1
      )
      playerReceivedYellowCartId =
        hostTeamPlayers[randomPlayerIndexForYellowCart].id
      newYellowCartCount = givingYellowCartToPlayer(
        hostTeamPlayers[randomPlayerIndexForYellowCart],
        gameType,
        prismaQueriesPlayGamePoolIndex
      )
      if (newYellowCartCount >= 2)
        hostTeamPlayers.splice(randomPlayerIndexForYellowCart, 1)
    } else {
      const randomPlayerIndexForYellowCart = createRandomNumber(
        0,
        visitingTeamPlayers.length - 1
      )
      playerReceivedYellowCartId =
        visitingTeamPlayers[randomPlayerIndexForYellowCart].id
      newYellowCartCount = givingYellowCartToPlayer(
        visitingTeamPlayers[randomPlayerIndexForYellowCart],
        gameType,
        prismaQueriesPlayGamePoolIndex
      )
      if (newYellowCartCount >= 2)
        visitingTeamPlayers.splice(randomPlayerIndexForYellowCart, 1)
    }

    return playerReceivedYellowCartId
  } catch (error) {
    throw error
  }
}

const changeTeamScoresAfterPlayGame = (
  hostTeam,
  visitingTeam,
  gameType,
  result,
  prismaQueriesPlayGamePoolIndex
) => {
  let hostTeamSponserCoinCount = hostTeam.sponser?.totalCoinCount
  let visitingTeamSponserCoinCount = visitingTeam.sponser?.totalCoinCount
  const hostTeamUpdatedData = {},
    visitingTeamUpdatedData = {}
  if (result === "equal") {
    hostTeamUpdatedData["totalEqualCount"] =
      hostTeam.teamScores.totalEqualCount + 1
    visitingTeamUpdatedData["totalEqualCount"] =
      visitingTeam.teamScores.totalEqualCount + 1
    if (gameType === "friendly") {
      hostTeamUpdatedData["spirit"] =
        hostTeam.spirit + 2 >= 100 ? 100 : hostTeam.spirit + 1
      visitingTeamUpdatedData["spirit"] =
        visitingTeam.spirit + 2 >= 100 ? 100 : visitingTeam.spirit + 1
      if (hostTeam.tournament)
        hostTeamUpdatedData["scoreInTournament"] =
          hostTeam.teamScores.scoreInTournament +
          hostTeam.tournament.equalFriendlyGamePoints
      if (visitingTeam.tournament)
        visitingTeamUpdatedData["scoreInTournament"] =
          visitingTeam.teamScores.scoreInTournament +
          visitingTeam.tournament.equalFriendlyGamePoints
    } else {
      hostTeamUpdatedData["totalScore"] = hostTeam.teamScores.totalScore + 2
      visitingTeamUpdatedData["totalScore"] =
        visitingTeam.teamScores.totalScore + 2
      hostTeamUpdatedData["spirit"] =
        hostTeam.spirit + 2 >= 100 ? 100 : hostTeam.spirit + 2
      visitingTeamUpdatedData["spirit"] =
        visitingTeam.spirit + 2 >= 100 ? 100 : visitingTeam.spirit + 2
      if (hostTeam.tournament)
        hostTeamUpdatedData["scoreInTournament"] =
          hostTeam.teamScores.scoreInTournament +
          hostTeam.tournament.equalOfficialGamePoints
      if (visitingTeam.tournament)
        visitingTeamUpdatedData["scoreInTournament"] =
          visitingTeam.teamScores.scoreInTournament +
          visitingTeam.tournament.equalOfficialGamePoints
    }
    if (gameType === "league") {
      hostTeamUpdatedData["scoreInLeague"] =
        hostTeam.teamScores.scoreInLeague + 2
      visitingTeamUpdatedData["scoreInLeague"] =
        visitingTeam.teamScores.scoreInLeague + 2
      hostTeamUpdatedData["equalCountInLeague"] =
        hostTeam.teamScores.equalCountInLeague + 1
      visitingTeamUpdatedData["equalCountInLeague"] =
        visitingTeam.teamScores.equalCountInLeague + 1
    }
  } else if (result === "hostTeam") {
    // winner = host team
    // loser = visiting team
    visitingTeamUpdatedData["totalLoseCount"] =
      visitingTeam.teamScores.totalLoseCount + 1
    hostTeamUpdatedData["totalWinCount"] = hostTeam.teamScores.totalWinCount + 1
    if (gameType === "friendly") {
      hostTeamUpdatedData["totalScore"] = hostTeam.teamScores.totalScore + 1
      hostTeamUpdatedData["spirit"] =
        hostTeam.spirit + 2 >= 100 ? 100 : hostTeam.spirit + 2
      visitingTeamUpdatedData["spirit"] =
        visitingTeam.spirit + 2 >= 100 ? 100 : visitingTeam.spirit - 3
      if (hostTeam.tournament)
        hostTeamUpdatedData["scoreInTournament"] =
          hostTeam.teamScores.scoreInTournament +
          hostTeam.tournament.winFriendlyGamePoints
    } else {
      hostTeamUpdatedData["spirit"] =
        hostTeam.spirit + 2 >= 100 ? 100 : hostTeam.spirit + 5
      visitingTeamUpdatedData["spirit"] =
        visitingTeam.spirit + 2 >= 100 ? 100 : visitingTeam.spirit - 10
      hostTeamUpdatedData["totalScore"] = hostTeam.teamScores.totalScore + 5
      visitingTeamUpdatedData["totalScore"] =
        visitingTeam.teamScores.totalScore >= 3
          ? visitingTeam.teamScores.totalScore - 3
          : 0
      if (hostTeam.tournament)
        hostTeamUpdatedData["scoreInTournament"] =
          hostTeam.teamScores.scoreInTournament +
          hostTeam.tournament.winOfficialGamePoints
      if (
        hostTeamSponserCoinCount &&
        hostTeamSponserCoinCount >= hostTeam.sponser.winOfficialGameCoinCount
      ) {
        hostTeamUpdatedData["coinCount"] = hostTeamUpdatedData["coinCount"]
          ? hostTeamUpdatedData["coinCount"] +
            hostTeam.sponser.winOfficialGameCoinCount +
            hostTeam.coinCount
          : hostTeam.sponser.winOfficialGameCoinCount + hostTeam.coinCount
        hostTeamSponserCoinCount -= hostTeam.sponser.winOfficialGameCoinCount
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          updateWithoutExecute(
            sponserModelName.english,
            { id: hostTeam.sponser.id },
            { totalCoinCount: hostTeamSponserCoinCount }
          )
        )
      }
    }
    if (gameType === "league") {
      hostTeamUpdatedData["scoreInLeague"] =
        hostTeam.teamScores.scoreInLeague + 5
      visitingTeamUpdatedData["scoreInLeague"] =
        visitingTeam.teamScores.scoreInLeague >= 3
          ? visitingTeam.teamScores.scoreInLeague - 3
          : 0
      hostTeamUpdatedData["winCountInLeague"] =
        hostTeam.teamScores.winCountInLeague + 1
      visitingTeamUpdatedData["loseCountInLeague"] =
        visitingTeam.teamScores.loseCountInLeague + 1
    }
  } else {
    // loser = host team
    // winner = visiting team
    hostTeamUpdatedData["totalLoseCount"] =
      hostTeam.teamScores.totalLoseCount + 1
    visitingTeamUpdatedData["totalWinCount"] =
      visitingTeam.teamScores.totalWinCount + 1
    if (gameType === "friendly") {
      visitingTeamUpdatedData["totalScore"] =
        visitingTeam.teamScores.totalScore + 1
      visitingTeamUpdatedData["spirit"] =
        visitingTeam.spirit + 2 >= 100 ? 100 : visitingTeam.spirit + 2
      hostTeamUpdatedData["spirit"] =
        hostTeam.spirit + 2 >= 100 ? 100 : hostTeam.spirit - 3
      if (visitingTeam.tournament)
        visitingTeamUpdatedData["scoreInTournament"] =
          visitingTeam.teamScores.scoreInTournament +
          visitingTeam.tournament.winFriendlyGamePoints
    } else {
      visitingTeamUpdatedData["spirit"] =
        visitingTeam.spirit + 2 >= 100 ? 100 : visitingTeam.spirit + 5
      hostTeamUpdatedData["spirit"] =
        hostTeam.spirit + 2 >= 100 ? 100 : hostTeam.spirit - 10
      visitingTeamUpdatedData["totalScore"] =
        visitingTeam.teamScores.totalScore + 5
      hostTeamUpdatedData["totalScore"] =
        hostTeam.teamScores.totalScore >= 3
          ? hostTeam.teamScores.totalScore - 3
          : 0
      if (visitingTeam.tournament)
        visitingTeamUpdatedData["scoreInTournament"] =
          visitingTeam.teamScores.scoreInTournament +
          visitingTeam.tournament.winOfficialGamePoints
      if (
        visitingTeamSponserCoinCount &&
        visitingTeamSponserCoinCount >=
          visitingTeam.sponser.winOfficialGameCoinCount
      ) {
        visitingTeamUpdatedData["coinCount"] = visitingTeamUpdatedData[
          "coinCount"
        ]
          ? visitingTeamUpdatedData["coinCount"] +
            visitingTeam.sponser.winOfficialGameCoinCount +
            visitingTeam.coinCount
          : visitingTeam.sponser.winOfficialGameCoinCount +
            visitingTeam.coinCount
        visitingTeamSponserCoinCount -=
          visitingTeam.sponser.winOfficialGameCoinCount
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          updateWithoutExecute(
            sponserModelName.english,
            { id: visitingTeam.sponser.id },
            { totalCoinCount: visitingTeamSponserCoinCount }
          )
        )
      }
    }
    if (gameType === "league") {
      visitingTeamUpdatedData["scoreInLeague"] =
        visitingTeam.teamScores.scoreInLeague + 5
      hostTeamUpdatedData["scoreInLeague"] =
        hostTeam.teamScores.scoreInLeague >= 3
          ? hostTeam.teamScores.scoreInLeague - 3
          : 0
      visitingTeamUpdatedData["winCountInLeague"] =
        visitingTeam.teamScores.winCountInLeague + 1
      hostTeamUpdatedData["loseCountInLeague"] =
        hostTeam.teamScores.loseCountInLeague + 1
    }
  }
  if (hostTeam.tournament)
    hostTeamUpdatedData["scoreInTournament"] =
      hostTeamUpdatedData["scoreInTournament"] +
      hostTeam.teamScores.scoreInTournament +
      hostTeam.tournament.playGamePoints
  if (visitingTeam.tournament)
    visitingTeamUpdatedData["scoreInTournament"] =
      hostTeamUpdatedData["scoreInTournament"] +
      visitingTeam.teamScores.scoreInTournament +
      visitingTeam.tournament.playGamePoints

  return { hostTeamUpdatedData, visitingTeamUpdatedData }
}

const calculateHostTeamGifts = async (hostTeam, result) => {
  const gifts = {}
  if (!hostTeam.isBlock) {
    const numberOfStadiumTicketCoins =
      +(await getNumberOfStadiumTicketCoinsFromRedis())

    gifts["coinCount"] =
      hostTeam.coinCount +
      (hostTeam.fanSatisfaction / 100) *
        hostTeam.teamAssets.stadium.capacity *
        numberOfStadiumTicketCoins
    if (result === "hostTeam")
      gifts["fanSatisfaction"] =
        hostTeam.fanSatisfaction + hostTeam.teamAssets.stadiumFacilities.win
    else if (result === "visitingTeam")
      gifts["fanSatisfaction"] =
        hostTeam.fanSatisfaction + hostTeam.teamAssets.stadiumFacilities.lose
    else
      gifts["fanSatisfaction"] =
        hostTeam.fanSatisfaction + hostTeam.teamAssets.stadiumFacilities.equal
  }
  return gifts
}

// in champions cup and golden cup if remove player with to yellow cart remove tow yellow cart from player
const playGame = async (hostTeamId, visitingTeamId, gameType, gameId) => {
  try {
    const prismaQueriesPlayGamePoolIndex = createPrismaQueryPool()
    const DifferenceInPointsForEachGoal =
      +(await getDifferenceInPointsForEachGoalFactorFromRedis())
    const hostTeam = await getInformationTeamNeedForPlayGame(hostTeamId)
    const visitingTeam = await getInformationTeamNeedForPlayGame(visitingTeamId)
    // replace injured , red cart , 2 yellowe cart player

    const alternativeHostTeamPlayers = await replacePlayersNotAallowedToPlay(
      hostTeam.id,
      hostTeam.players,
      gameType,
      prismaQueriesPlayGamePoolIndex
    )

    alternativeHostTeamPlayers.forEach((altPlayer) => {
      if (altPlayer.alternativePlayer)
        hostTeam.players.push({
          ...altPlayer.alternativePlayer,
          positionInMainComposition:
            hostTeam.players[altPlayer.playerIndex].positionInMainComposition,
        })
    })
    const alternativeHostTeamPlayersIndex = alternativeHostTeamPlayers.map(
      (altPlayer) => altPlayer.playerIndex
    )
    hostTeam.players = hostTeam.players.filter(
      (player, idx) => alternativeHostTeamPlayersIndex.indexOf(idx) === -1
    )
    const alternativeVisitingTeamPlayers =
      await replacePlayersNotAallowedToPlay(
        visitingTeam.id,
        visitingTeam.players,
        gameType,
        prismaQueriesPlayGamePoolIndex
      )
    alternativeVisitingTeamPlayers.forEach((altPlayer, idx) => {
      if (altPlayer.alternativePlayer)
        visitingTeam.players.push({
          ...altPlayer.alternativePlayer,
          positionInMainComposition:
            visitingTeam.players[altPlayer.playerIndex]
              .positionInMainComposition,
        })
    })

    const alternativeVisitingTeamPlayersIndex =
      alternativeVisitingTeamPlayers.map((altPlayer) => altPlayer.playerIndex)
    visitingTeam.players = visitingTeam.players.filter(
      (player, idx) => alternativeVisitingTeamPlayersIndex.indexOf(idx) === -1
    )
    const gameCount = await getGameCount()
    let injuredPlayerId = null,
      playerHasReceivedRedCartId = null
    if (gameCount % 3 === 0) {
      // injury player
      injuredPlayerId = injuringOnePlayer(
        hostTeam.players,
        visitingTeam.players,
        prismaQueriesPlayGamePoolIndex
      )
      // red cart
      playerHasReceivedRedCartId = givingRedCartToRandomPlayer(
        hostTeam.players,
        visitingTeam.players,
        gameType,
        prismaQueriesPlayGamePoolIndex
      )
    }
    // // 2 yellow cart
    const playerOneHasReceivedYellowCartId = givingYellowCartToRandomPlayer(
      hostTeam.players,
      visitingTeam.players,
      gameType,
      prismaQueriesPlayGamePoolIndex
    )
    const playerTwoHasReceivedYellowCartId = givingYellowCartToRandomPlayer(
      hostTeam.players,
      visitingTeam.players,
      gameType,
      prismaQueriesPlayGamePoolIndex
    )

    let sumOfHostTeamPlayersAge = 0
    let sumOfVisitingTeamPlayersAge = 0
    let hostTeamScore = visitingTeam.isBlock
      ? 3 * DifferenceInPointsForEachGoal
      : 0
    let visitingTeamScore = hostTeam.isBlock
      ? 3 * DifferenceInPointsForEachGoal
      : 0

    if (!hostTeam.isBlock && !visitingTeam.isBlock) {
      for (let i = 0; i < 11; i++) {
        if (hostTeam.players?.[i]) {
          sumOfHostTeamPlayersAge += hostTeam.players[i].age
          hostTeamScore +=
            calculatePlayerPositionFactor(
              hostTeam.players[i].position,
              hostTeam.players[i].positionInMainComposition
            ) *
            (hostTeam.players[i].energy / 100) *
            ((100 - hostTeam.players[i].injury) / 100) *
            hostTeam.players[i].totalPower *
            2
        }
        if (visitingTeam.players?.[i]) {
          sumOfVisitingTeamPlayersAge += visitingTeam.players[i].age
          visitingTeamScore +=
            calculatePlayerPositionFactor(
              visitingTeam.players[i].position,
              visitingTeam.players[i].positionInMainComposition
            ) *
            (visitingTeam.players[i].energy / 100) *
            ((100 - visitingTeam.players[i].injury) / 100) *
            visitingTeam.players[i].totalPower *
            2
        }
      }
      const avgOfHostTeamPlayers = Math.round(
        sumOfHostTeamPlayersAge / hostTeam.players.length
      )
      const avgOfVisitingTeamPlayers = Math.round(
        sumOfVisitingTeamPlayersAge / visitingTeam.players.length
      )

      hostTeamScore *= hostTeam.spirit / 100
      visitingTeamScore *= visitingTeam.spirit / 100

      const differenceOfPlayersAge =
        avgOfHostTeamPlayers - avgOfVisitingTeamPlayers
      if (differenceOfPlayersAge > 0)
        hostTeamScore += differenceOfPlayersAge * 500
      else visitingTeamScore += -differenceOfPlayersAge * 500

      hostTeamScore *= 1.1

      const strategyPriority = {
        Press: {
          less: ["KeepBall", "ShortPass"],
          more: ["CounterAttack"],
        },
        KeepBall: {
          less: ["CounterAttack"],
          more: ["Press", "LongPass"],
        },
        ShortPass: {
          less: ["CounterAttack", "LongPass"],
          more: ["Press"],
        },
        LongPass: {
          less: ["KeepBall"],
          more: ["LongPass"],
        },
        CounterAttack: {
          less: ["Press"],
          more: ["ShortPass", "KeepBall"],
        },
      }

      if (
        strategyPriority[hostTeam.strategy].less.includes(visitingTeam.strategy)
      )
        hostTeamScore *= 1.1
      else if (
        strategyPriority[hostTeam.strategy].more.includes(visitingTeam.strategy)
      )
        visitingTeamScore *= 1.1
    }

    const differenceOfHostTeamAndVisitingTeamGoalCount =
      Math.floor(
        Math.abs(hostTeamScore - visitingTeamScore) /
          DifferenceInPointsForEachGoal
      ) || 0

    let result, hostTeamGoalCount, visitingTeamGoalCount
    if (differenceOfHostTeamAndVisitingTeamGoalCount === 0) {
      result = "equal"
      hostTeamGoalCount = visitingTeamGoalCount = Math.floor(
        hostTeamScore / DifferenceInPointsForEachGoal
      )
    } else if (hostTeamScore > visitingTeamScore) {
      result = "hostTeam"
    } else if (hostTeamScore < visitingTeamScore) {
      result = "visitingTeam"
    }

    if (result !== "equal") {
      if (result === "hostTeam") {
        if (visitingTeam.technique === "Defend") {
          visitingTeamGoalCount = 0
          hostTeamGoalCount = differenceOfHostTeamAndVisitingTeamGoalCount
        } else if (visitingTeam.technique === "Moderate") {
          visitingTeamGoalCount = 1
          hostTeamGoalCount = 1 + differenceOfHostTeamAndVisitingTeamGoalCount
        } else {
          visitingTeamGoalCount = 2
          hostTeamGoalCount = 2 + differenceOfHostTeamAndVisitingTeamGoalCount
        }
      } else {
        if (hostTeam.technique === "Defend") {
          hostTeamGoalCount = 0
          visitingTeamGoalCount = differenceOfHostTeamAndVisitingTeamGoalCount
        } else if (hostTeam.technique === "Moderate") {
          hostTeamGoalCount = 1
          visitingTeamGoalCount =
            1 + differenceOfHostTeamAndVisitingTeamGoalCount
        } else {
          hostTeamGoalCount = 2
          visitingTeamGoalCount =
            2 + differenceOfHostTeamAndVisitingTeamGoalCount
        }
      }
    }

    const resultDescription = `${hostTeamGoalCount} : ${visitingTeamGoalCount}`

    const scorerPlayersId = []
    const scorerPlayerToNewGoalCountMap = {}
    const playerIdToGoalCountMap = {}
    const attackerAndMidfielderHostTeamPlayers = hostTeam.players.filter(
      (player) =>
        player.position.major === "Midfielder" ||
        player.position.major === "Attacker"
    )
    const attackerAndMidfielderHostTeamPlayersCount =
      attackerAndMidfielderHostTeamPlayers.length

    for (let i = 0; i < hostTeamGoalCount; i++) {
      const randomNumber = createRandomNumber(
        0,
        attackerAndMidfielderHostTeamPlayersCount - 1
      )
      const player = attackerAndMidfielderHostTeamPlayers[randomNumber]
      if (playerIdToGoalCountMap[player.id]) playerIdToGoalCountMap[player.id]++
      else playerIdToGoalCountMap[player.id] = 1
      if (
        scorerPlayerToNewGoalCountMap[player.id] ||
        scorerPlayerToNewGoalCountMap[player.id] === 0
      )
        scorerPlayerToNewGoalCountMap[player.id]++
      else scorerPlayerToNewGoalCountMap[player.id] = player.goalCountInLeague
      scorerPlayersId.push(player.id)
    }

    const attackerAndMidfielderVisitingTeamPlayers =
      visitingTeam.players.filter(
        (player) =>
          player.position.major === "Midfielder" ||
          player.position.major === "Attacker"
      )
    const attackerAndMidfielderVisitingTeamPlayersCount =
      attackerAndMidfielderVisitingTeamPlayers.length

    for (let i = 0; i < visitingTeamGoalCount; i++) {
      const randomNumber = createRandomNumber(
        0,
        attackerAndMidfielderVisitingTeamPlayersCount - 1
      )
      const player = attackerAndMidfielderVisitingTeamPlayers[randomNumber]
      if (playerIdToGoalCountMap[player.id]) playerIdToGoalCountMap[player.id]++
      else playerIdToGoalCountMap[player.id] = 1
      if (
        scorerPlayerToNewGoalCountMap[player.id] ||
        scorerPlayerToNewGoalCountMap[player.id] === 0
      )
        scorerPlayerToNewGoalCountMap[player.id]++
      else scorerPlayerToNewGoalCountMap[player.id] = player.goalCountInLeague
      scorerPlayersId.push(player.id)
    }

    let bestPlayerId
    for (const [playerId, goalCount] of Object.entries(
      playerIdToGoalCountMap
    )) {
      if (
        !playerIdToGoalCountMap[bestPlayerId] ||
        playerIdToGoalCountMap[bestPlayerId] <= goalCount
      ) {
        if (playerIdToGoalCountMap[bestPlayerId] === goalCount) {
          if (createRandomNumber(1, 2) === 2) bestPlayerId = +playerId
        } else bestPlayerId = +playerId
      }
    }

    // // winner team gifts
    const hostTeamGifts = await calculateHostTeamGifts(hostTeam, result)

    const scoreChangesResult = changeTeamScoresAfterPlayGame(
      hostTeam,
      visitingTeam,
      gameType,
      result,
      prismaQueriesPlayGamePoolIndex
    )

    const hostTeamUpdatedData = {
      ...hostTeamGifts,
      ...scoreChangesResult.hostTeamUpdatedData,
    }
    const visitingTeamUpdatedData = {
      ...scoreChangesResult.visitingTeamUpdatedData,
    }

    if (gameType === "league") {
      for (const [playerId, goalCount] of Object.entries(
        scorerPlayerToNewGoalCountMap
      )) {
        addPrismaQueryToPool(
          prismaQueriesPlayGamePoolIndex,
          updateWithoutExecute(
            playerModelName.english,
            { id: +playerId },
            { goalCountInLeague: goalCount }
          )
        )
      }
    }

    // // update host team
    // totalLoseCount
    // totalWinCount
    // winCountInLeague
    // loseCountInLeague
    // scoreInTournament
    addPrismaQueryToPool(
      prismaQueriesPlayGamePoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: hostTeam.id },
        {
          coinCount: Math.floor(hostTeamUpdatedData.coinCount),
          fanSatisfaction: hostTeamUpdatedData.fanSatisfaction,
          spirit: hostTeamUpdatedData.spirit,
        }
      )
    )
    addPrismaQueryToPool(
      prismaQueriesPlayGamePoolIndex,
      updateWithoutExecute(
        teamScoresModelName.english,
        { teamId: hostTeam.id },
        {
          totalEqualCount: hostTeamUpdatedData.totalEqualCount,
          totalScore: hostTeamUpdatedData.totalScore,
          scoreInLeague: hostTeamUpdatedData.scoreInLeague,
          equalCountInLeague: hostTeamUpdatedData.equalCountInLeague,
          totalLoseCount: hostTeamUpdatedData.totalLoseCount,
          totalWinCount: hostTeamUpdatedData.totalWinCount,
          winCountInLeague: hostTeamUpdatedData.winCountInLeague,
          loseCountInLeague: hostTeamUpdatedData.loseCountInLeague,
          scoreInTournament: hostTeamUpdatedData.scoreInTournament,
        }
      )
    )
    // // update visting team
    addPrismaQueryToPool(
      prismaQueriesPlayGamePoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: visitingTeam.id },
        {
          spirit: visitingTeamUpdatedData.spirit,
        }
      )
    )
    addPrismaQueryToPool(
      prismaQueriesPlayGamePoolIndex,
      updateWithoutExecute(
        teamScoresModelName.english,
        { teamId: visitingTeam.id },
        {
          totalEqualCount: visitingTeamUpdatedData.totalEqualCount,
          totalScore: visitingTeamUpdatedData.totalScore,
          scoreInLeague: visitingTeamUpdatedData.scoreInLeague,
          equalCountInLeague: visitingTeamUpdatedData.equalCountInLeague,
          totalLoseCount: visitingTeamUpdatedData.totalLoseCount,
          totalWinCount: visitingTeamUpdatedData.totalWinCount,
          winCountInLeague: visitingTeamUpdatedData.winCountInLeague,
          loseCountInLeague: visitingTeamUpdatedData.loseCountInLeague,
          scoreInTournament: visitingTeamUpdatedData.scoreInTournament,
        }
      )
    )

    if (gameType === "league") {
      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        connectScorerPlayerToLeagueGame(gameId, scorerPlayersId)
      )

      addPrismaQueryToPool(
        prismaQueriesPlayGamePoolIndex,
        playingLeagueGame(gameId, {
          gameId,
          result,
          resultDescription,
          winerTeamGoalCount:
            result === "hostTeam" ? hostTeamGoalCount : visitingTeamGoalCount,
          loserGoalCount:
            result === "hostTeam" ? visitingTeamGoalCount : hostTeamGoalCount,
          playerHasReceivedRedCartId,
          playerOneHasReceivedYellowCartId,
          playerTwoHasReceivedYellowCartId,
          injuredPlayerId,
          bestPlayerId,
        })
      )
    }

    await prismaTransaction(prismaQueriesPlayGamePoolIndex)
    await increaseGameCount()
  } catch (error) {
    throw error
  }
}

module.exports = {
  playGame,
}
