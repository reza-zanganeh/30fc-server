const { internalServerErrorHandler } = require("../helpers/responseHandler")
const { playGame } = require("../modelHelperFunction/game")
const { getLeagueGamesThatPassedStartTime } = require("../prismaQuery/game")
module.exports.playLeagueLevelOneGames = async () => {
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
