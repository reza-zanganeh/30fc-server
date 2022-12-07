const { PrismaClient } = require("@prisma/client")

const { player } = new PrismaClient()

module.exports.createPlayerPrismaQuery = async ({
  name,
  age,
  salary,
  // power
  controll,
  technique,
  flexibility,
  drible,
  experience,
  focus,
  pass,
  shoot,
  spead,
  stamina,
  // end of power
  totalPower,
  facePictureUrl,
  positionId,
  nationality,
  status,
  tShirtNumber,
}) => {
  try {
    const createdPlayer = await player.create({
      data: {
        name,
        age,
        salary,
        // power
        controll,
        technique,
        flexibility,
        drible,
        experience,
        focus,
        pass,
        shoot,
        spead,
        stamina,
        // end of power
        totalPower,
        tShirtNumber,
        facePicture: {
          create: { pictureUrl: facePictureUrl, isSpecial: true },
        },
        position: { connect: { id: positionId } },
        nationality,
        status,
      },
    })

    return createdPlayer
  } catch (error) {
    throw error
  }
}

module.exports.getSuitablePlayersToReplacePrismaQuery = async (
  teamId,
  gameType
) => {
  try {
    const select = {
      id: true,
      position: {
        select: {
          major: true,
          manor: true,
        },
      },
      age: true,
      energy: true,
      injury: true,
      totalPower: true,
      yellowCartInLeagueGameCount: true,
      yellowCartInFriendlyGameCount: true,
      yellowCartInChampionsCupGameCount: true,
      yellowCartInGoldenCupGameCount: true,
      hasRedCartInChampionsCupGame: true,
      hasRedCartInFriendlyGame: true,
      hasRedCartInGoldenCupGame: true,
      hasRedCartInLeagueGame: true,
    }
    const commonWhereCluse = [
      { teamId: { equals: teamId } },
      { inTeamMainComposition: { equals: false } },
    ]
    if (gameType === "league")
      commonWhereCluse.push(
        { yellowCartInLeagueGameCount: { not: { equals: "2" } } },
        { hasRedCartInLeagueGame: { equals: false } }
      )

    if (gameType === "friendly")
      commonWhereCluse.push(
        { yellowCartInFriendlyGameCount: { not: { equals: "2" } } },
        { hasRedCartInFriendlyGame: { equals: false } }
      )
    if (gameType === "championsCup")
      commonWhereCluse.push({ hasRedCartInChampionsCupGame: { equals: false } })
    if (gameType === "goldenCup")
      commonWhereCluse.push({ hasRedCartInGoldenCupGame: { equals: false } })

    const suitablePlayers = await player.findMany({
      where: {
        AND: commonWhereCluse,
      },
      select,
    })

    return suitablePlayers
  } catch (error) {
    throw error
  }
}
