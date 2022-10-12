const { modelName } = require("../../../config/Constant")
const { teamModelName } = modelName
const { internalServerErrorHandler } = require("../helpers/responseHandler")
const {
  getLeaguesPrismaQuery,
  updateLeaguePrismaQuery,
  createNewLeaguePrismaQuery,
  deleteLeagueWithoutComplateTeams,
} = require("../prismaQuery/league")
const { getNewUnBlockedTeam } = require("../prismaQuery/team")
const { deleteAllDoneLeaguGames } = require("../prismaQuery/game")
const {
  arrangeTeamsOfLeague,
  blockInactiveTeams,
  createNewLeague,
  getLeagueLevelToLeagueGameTimeMap,
  planningLeagueGames,
} = require("../modelHelperFunction/league")
const { updateThreeTopTeams } = require("../modelHelperFunction/team")
// at 12 am friday
module.exports.endLeagueCronJobHandler = async () => {
  try {
    await blockInactiveTeams()
    let needToCreateNewLeagues = true
    const leagues = await getLeaguesPrismaQuery()
    const newUnBlockedTeams = await getNewUnBlockedTeam()
    const leagueLevelToLeagueGameTimeMap =
      await getLeagueLevelToLeagueGameTimeMap()
    await deleteAllDoneLeaguGames()
    leagues.forEach(async (league) => {
      try {
        //  especify first team , second team , third team
        const firstTeamInLeague = league.teams[0]
        const secondTeamInLeague = league.teams[1]
        const thirdTeamInLeague = league.teams[2]
        // * increase count in team properties
        // * increase tournament score
        // * add sponser coin count to team
        await updateThreeTopTeams(
          firstTeamInLeague.id,
          secondTeamInLeague.id,
          thirdTeamInLeague.id
        )
        const leftLeagueIndex = 2 * league.group - 1
        const rightLeagueIndex = 2 * league.group
        const teamsOfLeagueIsComplate = await arrangeTeamsOfLeague(
          league,
          leagues[leftLeagueIndex],
          leagues[rightLeagueIndex],
          newUnBlockedTeams
        )
        const teamIds = league.teams.map((team) => ({ id: team.id }))
        //  planning new games and remove old games
        if (!teamsOfLeagueIsComplate) {
          await updateLeaguePrismaQuery(
            league.id,
            teamIds,
            firstTeamInLeague.id,
            secondTeamInLeague.id,
            thirdTeamInLeague.id
          )
          needToCreateNewLeagues = false
          return
        }
        const games = await planningLeagueGames(
          league.teams.map((team) => team.id),
          leagueLevelToLeagueGameTimeMap[league.level]
        )
        await updateLeaguePrismaQuery(
          league.id,
          teamIds,
          firstTeamInLeague.id,
          secondTeamInLeague.id,
          thirdTeamInLeague.id,
          games
        )
      } catch (error) {
        throw error
      }
    })

    //  if have new teams create new league
    if (needToCreateNewLeagues && newUnBlockedTeams.length >= 14) {
      let lastLeagueGroup = leagues[leagues.length - 1]?.group || 0
      while (newUnBlockedTeams.length >= 14) {
        const { newLeagueGroup, newLeagueLevel, teams, games } =
          await createNewLeague(lastLeagueGroup, newUnBlockedTeams)
        await createNewLeaguePrismaQuery(
          newLeagueLevel,
          newLeagueGroup,
          teams,
          games
        )
        lastLeagueGroup = newLeagueGroup
      }
    }
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}

module.exports.startLeagueCronJobHandler = async () => {
  try {
    // remove all league without 14 teams
    // un link first team second team third team
    await deleteLeagueWithoutComplateTeams()
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
