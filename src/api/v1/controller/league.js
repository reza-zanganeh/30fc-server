const { modelName } = require("../../../config/Constant")
const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
const {
  getLeaguesPrismaQuery,
  updateLeaguePrismaQuery,
  createNewLeaguePrismaQuery,
  deleteLeagueWithoutComplateTeams,
  removeTopThreeLeaguTeamsPrismaQuery,
  getLeagueTablePrismaQuery,
} = require("../prismaQuery/league")
const {
  getNewUnBlockedTeam,
  resetTeamScoresInLeagu,
} = require("../prismaQuery/team")
const {
  deleteAllLeaguGames,
  getLeagueGamesThatPassedStartTime,
} = require("../prismaQuery/game")
const {
  arrangeTeamsOfLeague,
  createNewLeague,
  getLeagueLevelToLeagueGameTimeMap,
  planningLeagueGames,
} = require("../modelHelperFunction/league")
const {
  createPrismaQueryPool,
  addPrismaQueryToPool,
  prismaTransaction,
} = require("../helpers/prisma")
const {
  updateThreeTopLeagueTeams,
  blockInactiveTeams,
} = require("../modelHelperFunction/team")
const { playGame } = require("../modelHelperFunction/game")

const { Ok } = require("../helpers/HttpResponse")

module.exports.startLeague = async () => {
  try {
    // remove all league without 14 teams
    // un link first team second team third team
    const prismaQueriesStartLeaguePoolIndex = createPrismaQueryPool()
    addPrismaQueryToPool(
      prismaQueriesStartLeaguePoolIndex,
      deleteLeagueWithoutComplateTeams()
    )
    addPrismaQueryToPool(
      prismaQueriesStartLeaguePoolIndex,
      removeTopThreeLeaguTeamsPrismaQuery()
    )
    await prismaTransaction(prismaQueriesStartLeaguePoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}

// at 12 am friday

module.exports.endLeague = async () => {
  try {
    const prismaQueriesEndLeaguePoolIndex = createPrismaQueryPool()
    // go to end session
    await blockInactiveTeams()
    let needToCreateNewLeagues = true
    const leagues = await getLeaguesPrismaQuery()
    const newUnBlockedTeams = await getNewUnBlockedTeam()
    const leagueLevelToLeagueGameTimeMap =
      await getLeagueLevelToLeagueGameTimeMap()
    deleteAllLeaguGames(prismaQueriesEndLeaguePoolIndex)

    for (let i = 0; i < leagues.length; i++) {
      //  especify first team , second team , third team
      const firstTeamInLeague = leagues[i].teams[0]
      const secondTeamInLeague = leagues[i].teams[1]
      const thirdTeamInLeague = leagues[i].teams[2]
      await updateThreeTopLeagueTeams(
        firstTeamInLeague.id,
        secondTeamInLeague.id,
        thirdTeamInLeague.id,
        prismaQueriesEndLeaguePoolIndex
      )
      const leftLeagueIndex = 2 * leagues[i].group - 1
      const rightLeagueIndex = 2 * leagues[i].group
      const teamsOfLeagueIsComplate = await arrangeTeamsOfLeague(
        leagues[i],
        leagues[leftLeagueIndex],
        leagues[rightLeagueIndex],
        newUnBlockedTeams
      )
      const teamIds = leagues[i].teams.map((team) => ({ id: team.id }))
      //  planning new games and remove old games
      if (!teamsOfLeagueIsComplate) {
        addPrismaQueryToPool(
          prismaQueriesEndLeaguePoolIndex,
          updateLeaguePrismaQuery(
            leagues[i].id,
            teamIds,
            firstTeamInLeague.id,
            secondTeamInLeague.id,
            thirdTeamInLeague.id
          )
        )
        needToCreateNewLeagues = false
        return
      }
      const games = planningLeagueGames(
        leagues[i].teams.map((team) => team.id),
        leagueLevelToLeagueGameTimeMap[leagues[i].level]
      )
      addPrismaQueryToPool(
        prismaQueriesEndLeaguePoolIndex,
        updateLeaguePrismaQuery(
          leagues[i].id,
          teamIds,
          firstTeamInLeague.id,
          secondTeamInLeague.id,
          thirdTeamInLeague.id,
          games
        )
      )
    }

    // reset teams score in league
    addPrismaQueryToPool(
      prismaQueriesEndLeaguePoolIndex,
      resetTeamScoresInLeagu()
    )
    //  if have new teams create new league
    if (needToCreateNewLeagues && newUnBlockedTeams.length >= 14) {
      let lastLeagueGroup = leagues[leagues.length - 1]?.group || 0
      while (newUnBlockedTeams.length >= 14) {
        const { newLeagueGroup, newLeagueLevel, teams, games } =
          await createNewLeague(lastLeagueGroup, newUnBlockedTeams)
        addPrismaQueryToPool(
          prismaQueriesEndLeaguePoolIndex,
          createNewLeaguePrismaQuery(
            newLeagueLevel,
            newLeagueGroup,
            teams,
            games
          )
        )
        lastLeagueGroup = newLeagueGroup
      }
    }

    await prismaTransaction(prismaQueriesEndLeaguePoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}

/**
 * for each league
 * especify first team , second team , third team
 * rearrange teams of leagues
 * planning new games and remove old games
 *
 * if have new teams create new league
 * planning games
 *
 * for eahc top teams
 * increase count in team properties
 * increase tournament score
 * add sponser coin count to team
 */

module.exports.getLeaguTable = async (req, res, next) => {
  try {
    const { id: leagueId } = req.params
    const leagueTable = await getLeagueTablePrismaQuery(+leagueId)
    resposeHandler(res, leagueTable, Ok("خواندن جدول لیگ"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.playRecievedTimeLeagueGames = async () => {
  try {
    const leagueGameThatPassedStartTime =
      await getLeagueGamesThatPassedStartTime()
    for (let i = 0; i < leagueGameThatPassedStartTime.length; i++) {
      await playGame(
        leagueGameThatPassedStartTime[i].hostTeamId,
        leagueGameThatPassedStartTime[i].visitingTeamId,
        "league",
        leagueGameThatPassedStartTime[i].id
      )
    }
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}
