const {
  createPrismaQueryPool,
  addPrismaQueryToPool,
  prismaTransaction,
} = require("../helpers/prisma")
const { internalServerErrorHandler } = require("../helpers/responseHandler")
const { getLeaguesPrismaQuery } = require("../prismaQuery/league")
const {
  deleteAllChampionsCupGames,
  getChampionsCupGamesThatPassedStartTime,
} = require("../prismaQuery/game")
const {
  getChampionsCupAndSortedChampionsGames,
  updateChampionsCupPrismaQuery,
  removeTopTwoTeamFromChampionsLeagu,
  createChampionsCupPrismaQuery,
  addChampionsCupGamesPrismaQuery,
} = require("../prismaQuery/championsCup")
const {
  updateFirstTeamAndSecondTeamInChampionsCupPrismaQuery,
} = require("../prismaQuery/team")
const {
  planningEliminationCupGames,
  getChampionsCupGameTime,
} = require("../modelHelperFunction/eliminationCup")
const { blockInactiveTeams } = require("../modelHelperFunction/team")
const { playGame } = require("../modelHelperFunction/game")
module.exports.startChampionsCup = async () => {
  try {
    const prismaQueriesStartChampionsPoolIndex = createPrismaQueryPool()
    // un link frist team and second team
    addPrismaQueryToPool(
      prismaQueriesStartChampionsPoolIndex,
      removeTopTwoTeamFromChampionsLeagu()
    )

    await prismaTransaction(prismaQueriesStartChampionsPoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}
// before call this function call end league
module.exports.endChampionsCup = async () => {
  try {
    const endChampionsCupPoolIndex = createPrismaQueryPool()
    // go to end session
    await blockInactiveTeams()
    // especify first and second teams and gifts
    const championsCupWithSortedGames =
      await getChampionsCupAndSortedChampionsGames()
    let firstTeamInChmapionsCupId, secondTeamInChampionsCupId
    if (championsCupWithSortedGames) {
      const championsCupGames = championsCupWithSortedGames.games
      const lastChampionsCupGame =
        championsCupGames[championsCupGames.length - 1]
      if (lastChampionsCupGame.result === "hostTeam") {
        firstTeamInChmapionsCupId = lastChampionsCupGame.hostTeamId
        secondTeamInChampionsCupId = lastChampionsCupGame.visitingTeamId
      } else {
        firstTeamInChmapionsCupId = lastChampionsCupGame.visitingTeamId
        secondTeamInChampionsCupId = lastChampionsCupGame.hostTeamId
      }
      deleteAllChampionsCupGames(endChampionsCupPoolIndex)
      // update first team and second team
      // first team
      // sponser
      // firstTeamInChampionsCupPoints
      // championsCupCount
      // totalScore
      // second team
      // secondTeamInChampionsCupPoints
      // arrange new cup and planning games
      // totalScore
      await updateFirstTeamAndSecondTeamInChampionsCupPrismaQuery(
        firstTeamInChmapionsCupId,
        secondTeamInChampionsCupId,
        endChampionsCupPoolIndex
      )
    }
    const leagues = await getLeaguesPrismaQuery()
    const selectedTeams = []
    if (leagues.length >= 15) {
      // select 8 from league 1 (1)
      // select 4 from level 2 (2)
      // select 2 from level 3 (4)
      // select 1 from level 4 (8)
      // 8 + 8 + 8 + 8
      selectedTeams.push(
        ...leagues[0].teams.slice(0, 8).map((team) => team.id),
        ...leagues[1].teams.slice(0, 4).map((team) => team.id),
        ...leagues[2].teams.slice(0, 4).map((team) => team.id),
        ...leagues[3].teams.slice(0, 2).map((team) => team.id),
        ...leagues[4].teams.slice(0, 2).map((team) => team.id),
        ...leagues[5].teams.slice(0, 2).map((team) => team.id),
        ...leagues[6].teams.slice(0, 2).map((team) => team.id),
        leagues[7].teams[0].id,
        leagues[8].teams[0].id,
        leagues[9].teams[0].id,
        leagues[10].teams[0].id,
        leagues[11].teams[0].id,
        leagues[12].teams[0].id,
        leagues[13].teams[0].id,
        leagues[14].teams[0].id
      )
    }
    // planning games
    if (selectedTeams.length > 0) {
      const championsCupGameTime = await getChampionsCupGameTime()
      const games = planningEliminationCupGames(
        selectedTeams,
        championsCupGameTime,
        24,
        1
      )
      if (championsCupWithSortedGames)
        addPrismaQueryToPool(
          endChampionsCupPoolIndex,
          updateChampionsCupPrismaQuery(
            championsCupWithSortedGames.id,
            firstTeamInChmapionsCupId,
            secondTeamInChampionsCupId,
            selectedTeams,
            games
          )
        )
      else
        addPrismaQueryToPool(
          endChampionsCupPoolIndex,
          createChampionsCupPrismaQuery(selectedTeams, games)
        )
    } else if (championsCupWithSortedGames)
      addPrismaQueryToPool(
        endChampionsCupPoolIndex,
        updateChampionsCupPrismaQuery(
          championsCupWithSortedGames.id,
          firstTeamInChmapionsCupId,
          secondTeamInChampionsCupId,
          [],
          []
        )
      )

    prismaTransaction(endChampionsCupPoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}

module.exports.playingRecivedStepChampionsCupGamesAndPlaningNextGame =
  async () => {
    try {
      const championsCupGameThatPassedStartTime =
        await getChampionsCupGamesThatPassedStartTime()
      const championsCupGameThatPassedStartTimeCount =
        championsCupGameThatPassedStartTime.length
      if (championsCupGameThatPassedStartTimeCount <= 0) return
      const winnerTeamIds = []
      const playingRecivedStepChampionsCupGamesAndPlaningNextGamePrismaPoolIndex =
        createPrismaQueryPool()
      for (let i = 0; i < championsCupGameThatPassedStartTimeCount; i++) {
        const { winnerTeamId } = await playGame(
          championsCupGameThatPassedStartTime[i].hostTeamId,
          championsCupGameThatPassedStartTime[i].visitingTeamId,
          "championsCup",
          championsCupGameThatPassedStartTime[i].id,
          playingRecivedStepChampionsCupGamesAndPlaningNextGamePrismaPoolIndex
        )
        winnerTeamIds.push(winnerTeamId)
      }
      if (winnerTeamIds.length >= 2) {
        // planning new games for winner
        const championsCupGameTime = await getChampionsCupGameTime()
        const nextStep = championsCupGameThatPassedStartTime[0].step + 1
        const championsCupId =
          championsCupGameThatPassedStartTime[0].championsCupId
        const newChampionsCupGames = planningEliminationCupGames(
          winnerTeamIds,
          championsCupGameTime,
          12,
          nextStep
        )
        addPrismaQueryToPool(
          playingRecivedStepChampionsCupGamesAndPlaningNextGamePrismaPoolIndex,
          addChampionsCupGamesPrismaQuery(newChampionsCupGames, championsCupId)
        )
        prismaTransaction(
          playingRecivedStepChampionsCupGamesAndPlaningNextGamePrismaPoolIndex
        )
      }
    } catch (error) {
      internalServerErrorHandler(null, error)
    }
  }
