const {
  paginationTakeItemsCount,
  modelName,
} = require("../../../config/Constant")
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

module.exports.readWithPaginationOrId = async (modelName, id, page = 1) => {
  try {
    let result
    if (id) result = await prisma[modelName].findFirst({ where: { id } })
    else {
      const take = paginationTakeItemsCount[modelName]
      const skip = getSkipFromPageAndTakeCount(page, take)
      result = await prisma[modelName].findMany({ skip, take })
    }
    return result
  } catch (error) {
    throw error
  }
}

module.exports.readOne = async (modelName, where, select) => {
  try {
    let result
    if (select) result = await prisma[modelName].findFirst({ where, select })
    else result = await prisma[modelName].findFirst({ where })

    return result
  } catch (error) {
    throw error
  }
}

module.exports.readAll = async (modelName, where, select) => {
  try {
    let result
    if (where && select)
      result = await prisma[modelName].findMany({ where, select })
    else if (where) result = await prisma[modelName].findMany({ where })
    else if (select) result = await prisma[modelName].findMany({ select })
    else result = await prisma[modelName].findMany()
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

module.exports.remove = async (modelName, where, select) => {
  try {
    let deletedRecord
    if (select) {
      deletedRecord = await prisma[modelName].delete({
        where,
        select,
      })
    } else {
      deletedRecord = await prisma[modelName].delete({
        where,
      })
    }
    return deletedRecord
  } catch (error) {
    throw error
  }
}

module.exports.count = async (modelName) => {
  try {
    const count = (
      await prisma[modelName].aggregate({
        _count: {
          id: true,
        },
      })
    )._count.id
    return count
  } catch (error) {
    throw error
  }
}

module.exports.getNthRecord = async (modelName, skip) => {
  try {
    const NthRecord = await prisma[modelName].findFirst({
      skip,
      take: 1,
    })
    return NthRecord
  } catch (error) {
    throw error
  }
}