const { PrismaClient } = require("@prisma/client")
const { playerFacePicture } = new PrismaClient()
const projectConfig = require("../../../config/index")
const { getSkipFromPageAndTakeCount } = require("../helpers/Functions")
module.exports.createPlayerFacePicture = async (pictureUrl) => {
  try {
    const newPlayerFacePicture = await playerFacePicture.create({
      data: { pictureUrl },
    })

    return newPlayerFacePicture
  } catch (error) {
    throw error
  }
}

module.exports.readPlayerFacePicture = async (id, page = 1) => {
  try {
    let result
    if (id) result = await playerFacePicture.findFirst({ where: { id: +id } })
    else {
      const take = projectConfig.paginationTakeItemsCount.playerFacePicture
      const skip = getSkipFromPageAndTakeCount(page, take)
      result = await playerFacePicture.findMany({ skip, take })
    }

    return result
  } catch (error) {
    throw error
  }
}

module.exports.deletePlayerFacePicture = async (id) => {
  try {
    const deletedPlayerFacePicture = await playerFacePicture.delete({
      where: {
        id: +id,
      },
    })
    return deletedPlayerFacePicture
  } catch (error) {
    throw error
  }
}
