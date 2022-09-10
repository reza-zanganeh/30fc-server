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
  facePictureId,
  positionId,
  teamId,
  nationality,
  status,
  inMainComposition,
  positionInMainCompositionId,
  price,
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
        // end of power
        facePicture: { connect: { id: facePictureId } },
        position: { connect: { id: positionId } },
        team: { connect: { id: teamId } },
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
