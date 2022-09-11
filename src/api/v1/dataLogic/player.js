const { PrismaClient } = require("@prisma/client")

const { player } = new PrismaClient()

module.exports.createPlayer = async ({
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
  facePictureUrl,
  positionId,
  teamId,
  nationality,
  status,
  tShirtNumber,
  price,
  inMainComposition,
  positionInMainCompositionId,
}) => {
  const totalPower =
    controll +
    technique +
    flexibility +
    drible +
    experience +
    focus +
    pass +
    shoot +
    spead +
    stamina
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
        totalPower,
        tShirtNumber,
        // end of power
        facePicture: {
          create: { pictureUrl: facePictureUrl, isSpecial: true },
        },
        position: { connect: { id: positionId } },
        ...(teamId && { team: { connect: { id: teamId } } }),
        nationality,
        status,
        ...(price && { price }),
        ...(inMainComposition && {
          positionInMainComposition: {
            connect: { id: positionInMainCompositionId },
          },
        }),
      },
    })

    return createdPlayer
  } catch (error) {
    throw error
  }
}
