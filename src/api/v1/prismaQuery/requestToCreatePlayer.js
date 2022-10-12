const { PrismaClient } = require("@prisma/client")
const { requestToCreatePlayer } = new PrismaClient()

module.exports.createRequestToCreatePlayerPrismaQuery = async (
  teamId,
  player
) => {
  try {
    const {
      name,
      age,
      salary,
      // power
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
      totalPower,
      // end of power
      pictureUrl,
      positionId,
      nationality,
      tShirtNumber,
    } = player

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
            status: "InRequest",
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

module.exports.confirmRequestToCreatePlayerPrismaQuery = async (
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
        status: "Confirm",
        adminResponse,
        player: {
          update: {
            status: "InMarket",
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

module.exports.rejectRequestToCreatePlayerPrismaQuery = async (
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

module.exports.reactivationRequestToCreatePlayerPrismaQuery = async (
  requestId
) => {
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
