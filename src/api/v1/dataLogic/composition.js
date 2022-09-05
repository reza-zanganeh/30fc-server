const { PrismaClient } = require("@prisma/client")
const { composition } = new PrismaClient()
const projectConfig = require("../../../config/index")
const { getSkipFromPageAndTakeCount } = require("../helpers/Functions")
module.exports.createComposition = async (data) => {
  try {
    const newComposition = await composition.create({
      data,
    })

    return newComposition
  } catch (error) {
    throw error
  }
}

module.exports.readComposition = async (id, page = 1) => {
  try {
    let result
    if (id) result = await composition.findFirst({ where: { id: +id } })
    else {
      const take = projectConfig.paginationTakeItemsCount.composition
      const skip = getSkipFromPageAndTakeCount(page, take)
      result = await composition.findMany({ skip, take })
    }

    return result
  } catch (error) {
    throw error
  }
}

module.exports.deleteComposition = async (id) => {
  try {
    const deletedComposition = await composition.delete({
      where: {
        id: +id,
      },
    })
    return deletedComposition
  } catch (error) {
    throw error
  }
}
