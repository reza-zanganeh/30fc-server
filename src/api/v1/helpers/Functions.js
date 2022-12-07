const jwt = require("jsonwebtoken")
const persianDate = require("persian-date").toLocale("fa")
const projectConfig = require("../../../config/index")
const { modelName } = require("../../../config/Constant")
const { readAll } = require("./prisma")
const { gameConstantVariableModelName } = modelName
const {
  setDifferenceInPointsForEachGoalFactorOnRedis,
  setSalaryFactorOnRedis,
  setInviteNewTeamCoinCountOnRedis,
  setNumberOfStadiumTicketCoinsOnRedis,
} = require("../services/redis")

module.exports.createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports.headsOrTails = (moreChance) => {
  const lessChance = moreChance === 2 ? 1 : 2
  const randomNumber = Math.floor(Math.random() * (100 - 0 + 1))
  if (randomNumber < 70) return moreChance
  else return lessChance
}

module.exports.createError = ({ statusCode, message }) => {
  const error = new Error()
  error.statusCode = statusCode
  error.message = message
  return error
}

module.exports.createOtpCodeToken = (phonenumber, isUserExists) => {
  const token = jwt.sign(
    { phonenumber, isUserExists },
    projectConfig.otpCode.tokenKey,
    {
      expiresIn: `${projectConfig.authentication.applicationActiveTimeInMinutes}m`,
    }
  )
  return token
}

module.exports.createCaptchaToken = (text) => {
  const token = jwt.sign({ text }, projectConfig.captcha.tokenKey, {
    expiresIn: `${projectConfig.authentication.applicationActiveTimeInMinutes}m`,
  })
  return token
}

module.exports.createAuthenticationToken = (id, role, isBlock) => {
  const token = jwt.sign(
    {
      id,
      role,
      isBlock,
    },
    projectConfig.authentication.tokenKey,
    {
      expiresIn: `${projectConfig.authentication.authenticationTokenExpiresTimeInMinute}m`,
    }
  )
  return token
}

module.exports.convertSecondToMinAndScond = (time) => {
  const minute = Math.floor(time / 60)
  const second = time - minute * 60
  return {
    minute,
    second,
  }
}

module.exports.sumOfArrayElements = (numbers) => {
  return numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  )
}

module.exports.readGeneralDataAndSaveOnRedis = async () => {
  try {
    // factors
    const gameConstantVariables = await readAll(
      gameConstantVariableModelName.english
    )
    const constantVariableNameMapToAmount = {}
    gameConstantVariables.forEach((variable) => {
      constantVariableNameMapToAmount[variable.name] = variable.amount
    })
    if (constantVariableNameMapToAmount["DifferenceInPointsForEachGoal"] <= 0)
      throw new Error("DifferenceInPointsForEachGoal can not be zero")
    await setDifferenceInPointsForEachGoalFactorOnRedis(
      constantVariableNameMapToAmount["DifferenceInPointsForEachGoal"]
    )
    await setSalaryFactorOnRedis(
      constantVariableNameMapToAmount["SalaryFactor"]
    )
    await setInviteNewTeamCoinCountOnRedis(
      constantVariableNameMapToAmount["InviteNewTeamCoinCount"]
    )
    await setNumberOfStadiumTicketCoinsOnRedis(
      constantVariableNameMapToAmount["NumberOfStadiumTicketCoins"]
    )
  } catch (error) {
    throw error
  }
}

module.exports.howManyDayPssedFromNow = (timeStamp) => {
  return new persianDate().diff(new persianDate(timeStamp), "days")
}
