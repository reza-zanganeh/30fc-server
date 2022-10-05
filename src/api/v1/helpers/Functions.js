const jwt = require("jsonwebtoken")
const projectConfig = require("../../../config/index")
const { modelName } = require("../../../config/Constant")
const { readAll } = require("./prisma")
const { gameFactorModelName } = modelName
const {
  setDifferenceInPointsForEachGoalFactorOnRedis,
  setSalaryFactorOnRedis,
  setInviteNewTeamCoinCountOnRedis,
} = require("../services/redis")

module.exports.createRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
    const factors = await readAll(gameFactorModelName.english)
    const factorsNameMapToAmount = {}
    factors.forEach((factor) => {
      factorsNameMapToAmount[factor.name] = factor.amount
    })
    await setDifferenceInPointsForEachGoalFactorOnRedis(
      factorsNameMapToAmount["DifferenceInPointsForEachGoal"]
    )
    await setSalaryFactorOnRedis(factorsNameMapToAmount["Salary"])
    await setInviteNewTeamCoinCountOnRedis(
      factorsNameMapToAmount["InviteNewTeamCoinCount"]
    )
  } catch (error) {
    throw error
  }
}
