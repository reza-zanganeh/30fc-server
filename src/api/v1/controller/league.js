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
const { deleteAllDoneLeaguGames } = require("../prismaQuery/game")
const {
  arrangeTeamsOfLeague,
  blockInactiveTeams,
  createNewLeague,
  getLeagueLevelToLeagueGameTimeMap,
  planningLeagueGames,
} = require("../modelHelperFunction/league")
const {
  createPrismaQueryPool,
  addPrismaQueryToPool,
  prismaTransaction,
} = require("../helpers/prisma")
const { updateThreeTopTeams } = require("../modelHelperFunction/team")
const { Ok } = require("../helpers/HttpResponse")
// at 12 am friday
module.exports.endLeagueCronJobHandler = async () => {
  try {
    const prismaQueriesEndLeagueCronJobPoolIndex = createPrismaQueryPool()
    await blockInactiveTeams()
    let needToCreateNewLeagues = true
    const leagues = await getLeaguesPrismaQuery()
    const newUnBlockedTeams = await getNewUnBlockedTeam()
    const leagueLevelToLeagueGameTimeMap =
      await getLeagueLevelToLeagueGameTimeMap()
    await deleteAllDoneLeaguGames()

    for (let i = 0; i < leagues.length; i++) {
      //  especify first team , second team , third team
      const firstTeamInLeague = leagues[i].teams[0]
      const secondTeamInLeague = leagues[i].teams[1]
      const thirdTeamInLeague = leagues[i].teams[2]
      await updateThreeTopTeams(
        firstTeamInLeague.id,
        secondTeamInLeague.id,
        thirdTeamInLeague.id,
        prismaQueriesEndLeagueCronJobPoolIndex
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
          prismaQueriesEndLeagueCronJobPoolIndex,
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
      const games = await planningLeagueGames(
        leagues[i].teams.map((team) => team.id),
        leagueLevelToLeagueGameTimeMap[leagues[i].level]
      )
      addPrismaQueryToPool(
        prismaQueriesEndLeagueCronJobPoolIndex,
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
      prismaQueriesEndLeagueCronJobPoolIndex,
      resetTeamScoresInLeagu()
    )
    //  if have new teams create new league
    if (needToCreateNewLeagues && newUnBlockedTeams.length >= 14) {
      let lastLeagueGroup = leagues[leagues.length - 1]?.group || 0
      while (newUnBlockedTeams.length >= 14) {
        const { newLeagueGroup, newLeagueLevel, teams, games } =
          await createNewLeague(lastLeagueGroup, newUnBlockedTeams)
        addPrismaQueryToPool(
          prismaQueriesEndLeagueCronJobPoolIndex,
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

    await prismaTransaction(prismaQueriesEndLeagueCronJobPoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}

module.exports.startLeagueCronJobHandler = async () => {
  try {
    // remove all league without 14 teams
    // un link first team second team third team
    const prismaQueriesStartLeagueCronJobPoolIndex = createPrismaQueryPool()
    addPrismaQueryToPool(
      prismaQueriesStartLeagueCronJobPoolIndex,
      deleteLeagueWithoutComplateTeams()
    )
    addPrismaQueryToPool(
      prismaQueriesStartLeagueCronJobPoolIndex,
      removeTopThreeLeaguTeamsPrismaQuery()
    )
    await prismaTransaction(prismaQueriesStartLeagueCronJobPoolIndex)
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
