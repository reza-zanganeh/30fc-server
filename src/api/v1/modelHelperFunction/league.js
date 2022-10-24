const { modelName } = require("../../../config/Constant")
const { gameTimeModelName } = modelName
const persianDate = require("persian-date").toLocale("fa")

const { howManyDayPssedFromNow } = require("../helpers/Functions")
const { readAll } = require("../helpers/prisma")
const {
  getUnBlockTeamsInleagues,
  blockTeamsPrismaQuery,
} = require("../prismaQuery/team")

const arrangeTeamsOfLeague = async (
  league,
  leftLowerLeague,
  rightLowerLeague,
  newUnBlockedTeams
) => {
  try {
    let teamsOfLeagueIsComplate = true
    const treeLeagueHasTwoChild = leftLowerLeague && rightLowerLeague
    const treeLeagueHasOneLeftChild = !!leftLowerLeague
    let numberOfTeamThatNeedToGoLowerLevel
    if (treeLeagueHasTwoChild) numberOfTeamThatNeedToGoLowerLevel = 4
    else if (treeLeagueHasOneLeftChild) numberOfTeamThatNeedToGoLowerLevel = 2
    else numberOfTeamThatNeedToGoLowerLevel = 0

    let teamsThatNeedGoTolowerLevel = league.teams.splice(
      -numberOfTeamThatNeedToGoLowerLevel,
      numberOfTeamThatNeedToGoLowerLevel
    )
    league.teams = league.teams.filter((team) => !team.isBlock)
    teamsThatNeedGoTolowerLevel = teamsThatNeedGoTolowerLevel.filter(
      (team) => !team.isBlock
    )
    if (treeLeagueHasTwoChild) {
      const neededTeamInLeague = 14 - league.teams.length
      const neededTeamFromEachLeague = neededTeamInLeague / 2
      league.teams.push(
        ...leftLowerLeague.teams.splice(0, neededTeamFromEachLeague),
        ...arrangeTeamsOfLeague.rightLowerLeague.teams.splice(
          0,
          neededTeamFromEachLeague
        )
      )
      const teamsThatNeedGoTolowerLevelCount =
        teamsThatNeedGoTolowerLevel.length
      leftLowerLeague.teams.unshift(
        ...teamsThatNeedGoTolowerLevel.splice(
          0,
          Math.floor(teamsThatNeedGoTolowerLevelCount / 2)
        )
      )
      rightLowerLeague.teams.unshift(...teamsThatNeedGoTolowerLevel)
    } else if (treeLeagueHasOneLeftChild) {
      const neededTeamInLeague = 14 - league.teams.length
      league.teams.push(...leftLowerLeague.teams.splice(0, neededTeamInLeague))
      leftLowerLeague.teams.unshift(...teamsThatNeedGoTolowerLevel)
    } else {
      const neededTeamInLeague = 14 - league.teams.length
      if (neededTeamInLeague < newUnBlockedTeams.length) {
        league.teams.push(...newUnBlockedTeams.splice(0, neededTeamInLeague))
      } else if (neededTeamInLeague !== 0) {
        league.teams.push(
          ...newUnBlockedTeams.splice(0, newUnBlockedTeams.length)
        )
        teamsOfLeagueIsComplate = false
      }
    }

    return teamsOfLeagueIsComplate
  } catch (error) {
    throw error
  }
}

const blockInactiveTeams = async () => {
  try {
    const teams = await getUnBlockTeamsInleagues()
    const inactiveTeamIds = []
    teams.forEach((team) => {
      if (howManyDayPssedFromNow(team.lastTimeSeen) >= 30)
        inactiveTeamIds.push(team.id)
    })
    await blockTeamsPrismaQuery(inactiveTeamIds)
  } catch (error) {
    throw error
  }
}

const planningLeagueGames = async (teamIds, firstTimeInDay) => {
  try {
    const { hour, minute } = firstTimeInDay
    let gameTime = new persianDate()
      .endOf("week")
      .add("h", hour)
      .add("m", minute)
      .add("d", 1)
    const leagueGameTimePlan = []
    for (let i = 1; i <= 13; i++) {
      leagueGameTimePlan.push(
        new Date(+`${gameTime.format("X")}000`).toISOString()
      )
      gameTime = gameTime.add("h", 12)
    }

    const leagueGamesPlan = [
      [
        // week one
        { visitingTeam: 1, hostingTeam: 0 },
        { visitingTeam: 3, hostingTeam: 2 },
        { visitingTeam: 5, hostingTeam: 4 },
        { visitingTeam: 7, hostingTeam: 6 },
        { visitingTeam: 9, hostingTeam: 8 },
        { visitingTeam: 11, hostingTeam: 10 },
        { visitingTeam: 13, hostingTeam: 12 },
      ],
      [
        // week two
        { visitingTeam: 10, hostingTeam: 5 },
        { visitingTeam: 6, hostingTeam: 1 },
        { visitingTeam: 4, hostingTeam: 13 },
        { visitingTeam: 12, hostingTeam: 11 },
        { visitingTeam: 8, hostingTeam: 3 },
        { visitingTeam: 2, hostingTeam: 9 },
        { visitingTeam: 0, hostingTeam: 7 },
      ],
      [
        // week three
        { visitingTeam: 11, hostingTeam: 6 },
        { visitingTeam: 13, hostingTeam: 2 },
        { visitingTeam: 9, hostingTeam: 5 },
        { visitingTeam: 3, hostingTeam: 10 },
        { visitingTeam: 8, hostingTeam: 0 },
        { visitingTeam: 1, hostingTeam: 4 },
        { visitingTeam: 7, hostingTeam: 12 },
      ],
      [
        // week four
        { visitingTeam: 5, hostingTeam: 13 },
        { visitingTeam: 10, hostingTeam: 4 },
        { visitingTeam: 2, hostingTeam: 11 },
        { visitingTeam: 6, hostingTeam: 9 },
        { visitingTeam: 7, hostingTeam: 1 },
        { visitingTeam: 12, hostingTeam: 8 },
        { visitingTeam: 0, hostingTeam: 3 },
      ],
      [
        // week five
        { visitingTeam: 3, hostingTeam: 11 },
        { visitingTeam: 0, hostingTeam: 12 },
        { visitingTeam: 4, hostingTeam: 2 },
        { visitingTeam: 13, hostingTeam: 10 },
        { visitingTeam: 1, hostingTeam: 5 },
        { visitingTeam: 8, hostingTeam: 6 },
        { visitingTeam: 9, hostingTeam: 7 },
      ],
      [
        // week six
        { visitingTeam: 10, hostingTeam: 12 },
        { visitingTeam: 11, hostingTeam: 0 },
        { visitingTeam: 7, hostingTeam: 3 },
        { visitingTeam: 9, hostingTeam: 4 },
        { visitingTeam: 1, hostingTeam: 8 },
        { visitingTeam: 6, hostingTeam: 13 },
        { visitingTeam: 5, hostingTeam: 2 },
      ],
      [
        // week seven
        { visitingTeam: 4, hostingTeam: 11 },
        { visitingTeam: 12, hostingTeam: 5 },
        { visitingTeam: 3, hostingTeam: 9 },
        { visitingTeam: 2, hostingTeam: 10 },
        { visitingTeam: 0, hostingTeam: 6 },
        { visitingTeam: 13, hostingTeam: 1 },
        { visitingTeam: 8, hostingTeam: 7 },
      ],
      [
        // week eight
        { visitingTeam: 6, hostingTeam: 10 },
        { visitingTeam: 11, hostingTeam: 5 },
        { visitingTeam: 9, hostingTeam: 0 },
        { visitingTeam: 3, hostingTeam: 12 },
        { visitingTeam: 8, hostingTeam: 4 },
        { visitingTeam: 1, hostingTeam: 2 },
        { visitingTeam: 7, hostingTeam: 13 },
      ],
      [
        // week nine
        { visitingTeam: 12, hostingTeam: 1 },
        { visitingTeam: 5, hostingTeam: 3 },
        { visitingTeam: 10, hostingTeam: 9 },
        { visitingTeam: 11, hostingTeam: 7 },
        { visitingTeam: 13, hostingTeam: 8 },
        { visitingTeam: 4, hostingTeam: 0 },
        { visitingTeam: 2, hostingTeam: 6 },
      ],
      [
        // week ten
        { visitingTeam: 8, hostingTeam: 5 },
        { visitingTeam: 9, hostingTeam: 12 },
        { visitingTeam: 7, hostingTeam: 10 },
        { visitingTeam: 0, hostingTeam: 2 },
        { visitingTeam: 6, hostingTeam: 4 },
        { visitingTeam: 3, hostingTeam: 13 },
        { visitingTeam: 1, hostingTeam: 11 },
      ],
      [
        // week eleven
        { visitingTeam: 2, hostingTeam: 8 },
        { visitingTeam: 11, hostingTeam: 9 },
        { visitingTeam: 4, hostingTeam: 3 },
        { visitingTeam: 10, hostingTeam: 1 },
        { visitingTeam: 5, hostingTeam: 7 },
        { visitingTeam: 13, hostingTeam: 0 },
        { visitingTeam: 12, hostingTeam: 6 },
      ],
      [
        // week twelve
        { visitingTeam: 0, hostingTeam: 5 },
        { visitingTeam: 8, hostingTeam: 10 },
        { visitingTeam: 13, hostingTeam: 11 },
        { visitingTeam: 1, hostingTeam: 9 },
        { visitingTeam: 2, hostingTeam: 7 },
        { visitingTeam: 4, hostingTeam: 12 },
        { visitingTeam: 6, hostingTeam: 3 },
      ],
      [
        // week thirteen
        { visitingTeam: 3, hostingTeam: 1 },
        { visitingTeam: 12, hostingTeam: 2 },
        { visitingTeam: 5, hostingTeam: 6 },
        { visitingTeam: 7, hostingTeam: 4 },
        { visitingTeam: 11, hostingTeam: 8 },
        { visitingTeam: 9, hostingTeam: 13 },
        { visitingTeam: 10, hostingTeam: 0 },
      ],
    ]
    const games = []
    leagueGamesPlan.forEach((week, idx) => {
      week.forEach((day) => {
        games.push({
          hostTeamId: teamIds[day.hostingTeam],
          visitingTeamId: teamIds[day.visitingTeam],
          startTime: leagueGameTimePlan[idx],
        })
      })
    })
    return games
  } catch (error) {
    throw error
  }
}

const createNewLeague = async (lastLeagueGroup = 1, newUnBlockedTeams) => {
  try {
    const leagueLevelToLeagueGameTimeMap =
      await getLeagueLevelToLeagueGameTimeMap()
    let newLeagueLevel = 1
    let newLeagueGroup = lastLeagueGroup + 1
    while (newLeagueGroup > 1) {
      newLeagueLevel += 1
      newLeagueGroup /= 2
    }
    newLeagueGroup = lastLeagueGroup + 1
    const teams = newUnBlockedTeams.splice(0, 14)
    //  planning games
    const games = await planningLeagueGames(
      teams.map((team) => team.id),
      leagueLevelToLeagueGameTimeMap[newLeagueLevel]
    )
    return {
      newLeagueLevel,
      newLeagueGroup,
      teams: teams.map((team) => ({ id: team.id })),
      games,
    }
  } catch (error) {
    throw error
  }
}

const getLeagueLevelToLeagueGameTimeMap = async () => {
  try {
    const leagueGameTimes = await readAll(gameTimeModelName.english)
    const leagueNameToLeagueLevelNumberMap = {
      LeagueLevelOne: 1,
      LeagueLevelTwo: 2,
      LeagueLevelThree: 3,
      LeagueLevelFour: 4,
      LeagueLevelFive: 5,
      LeagueLevelSix: 6,
    }
    const leagueLevelToLeagueGameTimeMap = {}
    leagueGameTimes.forEach((leagueGameTime) => {
      if (!leagueNameToLeagueLevelNumberMap[leagueGameTime.name]) return
      leagueLevelToLeagueGameTimeMap[
        leagueNameToLeagueLevelNumberMap[leagueGameTime.name]
      ] = {
        hour: leagueGameTime.hour,
        minute: leagueGameTime.minute,
      }
    })
    return leagueLevelToLeagueGameTimeMap
  } catch (error) {
    throw error
  }
}

module.exports = {
  arrangeTeamsOfLeague,
  blockInactiveTeams,
  createNewLeague,
  planningLeagueGames,
  getLeagueLevelToLeagueGameTimeMap,
}
