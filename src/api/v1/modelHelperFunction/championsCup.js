const { createRandomNumber, headsOrTails } = require("../helpers/Functions")
const { readOne } = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const { gameTimeModelName } = modelName
const persianDate = require("persian-date").toLocale("fa")

const planningChampionsCupGames = (teamIds, firstTimeInDay, step) => {
  try {
    const { hour, minute } = firstTimeInDay
    let gameTime = new persianDate()
      .endOf("week")
      .add("h", hour)
      .add("m", minute)
      .add("d", 1)
    for (let i = 1; i < step; i++) {
      gameTime = gameTime.add("h", 24)
    }
    const championsCupGameTimePlan = new Date(
      +`${gameTime.format("X")}000`
    ).toISOString()
    const games = []
    const teamCount = teamIds.length
    let headOrTailResult
    for (
      let championsCupGameCounter = 0;
      championsCupGameCounter < teamCount;
      championsCupGameCounter += 2
    ) {
      const moreChance = headOrTailResult ? (headOrTailResult === 1 ? 2 : 1) : 1
      headOrTailResult = headsOrTails(moreChance)
      if (headOrTailResult === 1) {
        games.push({
          hostTeamId: teamIds[championsCupGameCounter],
          visitingTeamId: teamIds[championsCupGameCounter + 1],
          startTime: championsCupGameTimePlan,
          step,
        })
      } else {
        games.push({
          hostTeamId: teamIds[championsCupGameCounter + 1],
          visitingTeamId: teamIds[championsCupGameCounter],
          startTime: championsCupGameTimePlan,
          step,
        })
      }
    }

    return games
  } catch (error) {
    throw error
  }
}

const getChampionsCupGameTime = async () => {
  try {
    const championsCupTime = await readOne(gameTimeModelName.english, {
      name: { equals: "ChampionsCup" },
    })
    return championsCupTime
  } catch (error) {
    throw error
  }
}

module.exports = {
  planningChampionsCupGames,
  getChampionsCupGameTime,
}
