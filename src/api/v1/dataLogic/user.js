const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const { Result } = require("express-validator")
const { user } = new PrismaClient()

module.exports.findUser = async (filter) => {
  try {
    const findedUser = await user.findFirst({
      where: filter,
    })
    return findedUser
  } catch (error) {
    throw error
  }
}

module.exports.createUser = async (phonenumber, email, fullname, password) => {
  try {
    const hashedPass = await bcrypt.hash(password, 10)
    const newUser = await user.create({
      data: {
        email,
        phonenumber,
        fullname,
        password: hashedPass,
      },
    })

    return newUser
  } catch (error) {
    throw error
  }
}

module.exports.updateUserByUserId = async (userId, data) => {
  try {
    if (data.hasOwnProperty("password")) {
      data.password = await bcrypt.hash(data.password, 10)
    }
    const updatedUser = await user.update({
      where: {
        id: +userId,
      },
      data,
    })

    return updatedUser
  } catch (error) {
    throw error
  }
}
