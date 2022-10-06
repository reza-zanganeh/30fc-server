const { modelName } = require("../../../config/Constant")
const { playerModelName } = modelName
const { readAll } = require("../helpers/prisma")

// validation
module.exports.validateTShirtNumber = async (tShirtNumber, teamId) => {
  try {
    const players = await readAll(
      playerModelName.english,
      {
        teamId: +teamId,
      },
      { id: true, tShirtNumber: true }
    )
    const playerWithSameSelectedTShirtNumber = players.find(
      (player) => player.tShirtNumber == tShirtNumber
    )

    return {
      isValid: !playerWithSameSelectedTShirtNumber,
    }
  } catch (error) {
    throw error
  }
}
