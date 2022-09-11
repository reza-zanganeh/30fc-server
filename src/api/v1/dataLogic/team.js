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
