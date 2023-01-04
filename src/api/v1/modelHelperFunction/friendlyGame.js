const {
  addPrismaQueryToPool,
  createWithoutExecute,
  updateWithoutExecute,
  readAll,
  removeAllWithoutExecution,
} = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const {
  requestFriendlyGameModelName,
  teamModelName,
  gameTimeModelName,
  friendlyGameScorerPlayerModelName,
  friendlyGame,
} = modelName
const persianDate = require("persian-date").toLocale("fa")

const createFriendlyGameRequestQuery = (
  senderTeam,
  receiverTeam,
  gameTime,
  prismaPoolIndex
) => {
  try {
    addPrismaQueryToPool(
      prismaPoolIndex,
      createWithoutExecute(requestFriendlyGameModelName.english, {
        senderTeamId: senderTeam.id,
        receiverTeamId: receiverTeam.id,
        gameTime,
      })
    )

    const senderTeamUpdatedData = {
      friendlyGameCount: senderTeam.friendlyGameCount + 1,
    }
    const receiverTeamUpdatedData = {
      friendlyGameCount: receiverTeam.friendlyGameCount + 1,
    }

    if (gameTime === "One") {
      senderTeamUpdatedData["friendlyGameTimeOneIsEmpty"] = false
      receiverTeamUpdatedData["friendlyGameTimeOneIsEmpty"] = false
    } else if (gameTime === "Two") {
      senderTeamUpdatedData["friendlyGameTimeTwoIsEmpty"] = false
      receiverTeamUpdatedData["friendlyGameTimeTwoIsEmpty"] = false
    } else if (gameTime === "Three") {
      senderTeamUpdatedData["friendlyGameTimeThreeIsEmpty"] = false
      receiverTeamUpdatedData["friendlyGameTimeThreeIsEmpty"] = false
    }

    addPrismaQueryToPool(
      prismaPoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: +senderTeam.id },
        senderTeamUpdatedData
      )
    )
    addPrismaQueryToPool(
      prismaPoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: +receiverTeam.id },
        receiverTeamUpdatedData
      )
    )
  } catch (error) {
    throw error
  }
}

const getFriendlyGameTime = async () => {
  try {
    const championsCupTime = await readAll(gameTimeModelName.english, {
      name: { in: ["FriendlyGameOne", "FriendlyGameTwo", "FriendlyGameThree"] },
    })
    return championsCupTime
  } catch (error) {
    throw error
  }
}

const planningFriendlyGame = async (requestFriendlyGame) => {
  try {
    // create three time base on tommoro
    const friendlyGameTimes = await getFriendlyGameTime()
    const gameTimes = {}
    let now = new persianDate().startOf("day")
    friendlyGameTimes.forEach((time) => {
      gameTimes[time.name.replace("FriendlyGame", "")] = new Date(
        +`${now.add("h", time.hour).add("m", time.minute).format("X")}000`
      ).toISOString()
    })
    // loop on requests => create game for each request
    const games = []
    const requestFriendlyGameCount = requestFriendlyGame.length
    for (let i = 0; i < requestFriendlyGameCount; i++) {
      games.push({
        hostTeamId: requestFriendlyGame[i].senderTeamId,
        visitingTeamId: requestFriendlyGame[i].receiverTeamId,
        startTime: gameTimes[requestFriendlyGame[i].gameTime],
      })
    }
    return games
  } catch (error) {
    throw error
  }
}

const removeAditionalFriendlyGameData = (prismaPoolIndex) => {
  try {
    addPrismaQueryToPool(
      prismaPoolIndex,
      removeAllWithoutExecution(friendlyGameScorerPlayerModelName.english)
    )
    addPrismaQueryToPool(
      prismaPoolIndex,
      removeAllWithoutExecution(friendlyGame.english, {
        result: { not: { equals: "undone" } },
      })
    )
    addPrismaQueryToPool(
      prismaPoolIndex,
      removeAllWithoutExecution(requestFriendlyGameModelName.english)
    )
  } catch (error) {
    throw error
  }
}

module.exports = {
  createFriendlyGameRequestQuery,
  planningFriendlyGame,
  removeAditionalFriendlyGameData,
}
