const projectConfig = require("../../../config/index")
const { getSkipFromPageAndTakeCount } = require("./Functions")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
module.exports.create = async (modelName, data) => {
  try {
    const newRecord = await prisma[modelName].create({
      data,
    })
    return newRecord
  } catch (error) {
    throw error
  }
}

module.exports.read = async (modelName, where, page = 1) => {
  try {
    let result
    if (where) result = await prisma[modelName].findFirst({ where })
    else {
      const take = projectConfig.paginationTakeItemsCount[modelName]
      const skip = getSkipFromPageAndTakeCount(page, take)
      result = await prisma[modelName].findMany({ skip, take })
    }
    return result
  } catch (error) {
    throw error
  }
}

module.exports.update = async (modelName, where, data) => {
  try {
    const updatedRecord = await prisma[modelName].update({
      where,
      data,
    })
    return updatedRecord
  } catch (error) {
    throw error
  }
}

module.exports.remove = async (modelName, where) => {
  try {
    const deletedRecord = await prisma[modelName].delete({
      where,
    })
    return deletedRecord
  } catch (error) {
    throw error
  }
}
