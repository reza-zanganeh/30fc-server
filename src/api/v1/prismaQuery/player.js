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
