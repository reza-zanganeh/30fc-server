const { PrismaClient } = require("@prisma/client")
const { requestToCreatePlayer } = new PrismaClient()

module.exports.createRequestToCreatePlayer = async (teamId, player) => {
  try {
    const {
      name,
      age,
      salary,
      controll,
      drible,
      experience,
      flexibility,
      focus,
      shoot,
      spead,
      pass,
      stamina,
      technique,
      pictureUrl,
      positionId,
      nationality,
      tShirtNumber,
    } = player
    const totalPower =
      controll +
      drible +
      experience +
      flexibility +
      focus +
      shoot +
      spead +
      pass +
      stamina +
      technique

    const newRequest = await requestToCreatePlayer.create({
      data: {
        team: { connect: { id: teamId } },
        player: {
          create: {
            name,
            age,
            salary,
            totalPower,
            controll,
            drible,
            experience,
            flexibility,
            focus,
            shoot,
            spead,
            pass,
            stamina,
            technique,
            facePicture: {
              create: {
                pictureUrl,
                isSpecial: true,
              },
            },
            position: { connect: { id: positionId } },
            nationality,
            status: "INREQUEST",
            tShirtNumber,
          },
        },
      },
    })
    return newRequest
  } catch (error) {
    throw error
  }
}

module.exports.confirmRequestToCreatePlayer = async (
  requestId,
  price,
  adminResponse
) => {
  try {
    const updatedRequest = await requestToCreatePlayer.update({
      where: {
        id: requestId,
      },
      data: {
        status: "CONFIRM",
        adminResponse,
        player: {
          update: {
            status: "INMARKET",
            price,
          },
        },
      },
    })
    return updatedRequest
  } catch (error) {
    throw error
  }
}

module.exports.rejectRequestToCreatePlayer = async (
  requestId,
  adminResponse
) => {
  try {
    const updatedRequest = await requestToCreatePlayer.update({
      where: {
        id: requestId,
      },
      data: {
        status: "REJECT",
        adminResponse,
      },
    })
    return updatedRequest
  } catch (error) {
    throw error
  }
}

module.exports.reactivationRequestToCreatePlayer = async (requestId) => {
  try {
    const updatedRequest = await requestToCreatePlayer.update({
      where: {
        id: requestId,
      },
      data: {
        status: "PENDING",
      },
    })
    return updatedRequest
  } catch (error) {
    throw error
  }
}
