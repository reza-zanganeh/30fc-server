const { PrismaClient } = require("@prisma/client")
const { reservedTeamName } = new PrismaClient()
const projectConfig = require("../../../config/index")
const { getSkipFromPageAndTakeCount } = require("../helpers/Functions")
module.exports.createReservedTeamName = async (name) => {
  try {
    const newReservedTeamName = await reservedTeamName.create({
      data: { name },
    })

    return newReservedTeamName
  } catch (error) {
    throw error
  }
}

module.exports.readReservedTeamName = async (id, page = 1) => {
  try {
    let result
    if (id) result = await reservedTeamName.findFirst({ where: { id: +id } })
    else {
      const take = projectConfig.paginationTakeItemsCount.reservedTeamName
      const skip = getSkipFromPageAndTakeCount(page, take)
      result = await reservedTeamName.findMany({ skip, take })
    }

    return result
  } catch (error) {
    throw error
  }
}

module.exports.updateReservedTeamName = async (id, newName) => {
  try {
    const updatedReservedTeamName = await reservedTeamName.update({
      where: {
        id: +id,
      },
      data: {
        name: newName,
      },
    })
    return updatedReservedTeamName
  } catch (error) {
    throw error
  }
}

module.exports.deleteReservedTeamName = async (id) => {
  try {
    const deletedReservedTeamName = await reservedTeamName.delete({
      where: {
        id: +id,
      },
    })
    return deletedReservedTeamName
  } catch (error) {
    throw error
  }
}
