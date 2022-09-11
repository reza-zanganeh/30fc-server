const { PrismaClient } = require("@prisma/client")
const { team } = new PrismaClient()

module.exports.createTeam = async (
  name,
  ownerId,
  compositionId,
  strategy,
  technique,
  players
) => {
  try {
    const createdTeam = await team.create({
      data: {
        name,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        composition: {
          connect: {
            id: compositionId,
          },
        },
        strategy,
        technique,
        coinCount: 1000,
        players: {
          createMany: {
            data: players,
          },
        },
      },
    })
    return createdTeam
  } catch (error) {
    throw error
  }
}

module.exports.getPlayers = async (teamId) => {
  try {
    const players = team.findFirst({
      where: {
        id: +teamId,
      },
      select: {
        players: {
          select: {
            id: true,
            name: true,
            age: true,
            position: {
              select: {
                major: true,
                manor: true,
              },
            },
            injury: true,
            inMainComposition: true,
            positionInMainComposition: true,
            // power
            totalPower: true,
            energy: true,
            tShirtNumber: true,
          },
        },
      },
    })

    return players
  } catch (error) {
    throw error
  }
}

module.exports.changeComposition = async (
  teamId,
  compositionId,
  newPlayerPosition
) => {
  try {
    const updatedTeam = await team.update({
      where: {
        id: teamId,
      },
      data: {
        composition: {
          connect: { id: compositionId },
        },
        players: {
          updateMany: newPlayerPosition.map((player) => ({
            where: { id: player.id },
            data: {
              positionInMainCompositionId: player.positionInMainCompositionId,
            },
          })),
        },
      },
    })
    return updatedTeam
  } catch (error) {
    throw error
  }
}
