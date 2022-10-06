const redis = require("redis")
const projectConfig = require("../../../config/index")

const client = redis.createClient(
  projectConfig.redis.host,
  projectConfig.redis.port
)

client.on("error", (err) => {
  console.log(err)
})

client.connect()

const OTPCODEKEY = "OTPCODE"
const REQUESTTOLOGIN = "REQUESTTOLOGIN"
const RESETPASSWORD = "RESETPASSWORD"
const NEEDLOGINAGAIN = "NEEDLOGINAGAIN"
const INVALIDPASSWORD = "INVALIPASSWORD"

const setOnRedis = async (key, value, expiresIn) => {
  return await client.set(key, value, expiresIn ? { EX: expiresIn * 60 } : {})
}

const getFromRedis = async (key) => {
  return await client.get(key)
}

const deleteFromRedis = async (key) => {
  return await client.del(key)
}

const getTtlFromRedis = async (key) => {
  return await client.ttl(key)
}

module.exports.setRequestToLoginOnRedis = async (phonenumber) => {
  return await setOnRedis(
    `${REQUESTTOLOGIN}_${phonenumber}`,
    "",
    projectConfig.authentication.applicationActiveTimeInMinutes
  )
}

module.exports.getRequestToLoginTtlFromRedis = async (phonenumber) => {
  return await getTtlFromRedis(`${REQUESTTOLOGIN}_${phonenumber}`)
}

module.exports.setOtpCodeOnRedis = async (phonenumber, code) => {
  return await setOnRedis(
    `${OTPCODEKEY}_${phonenumber}`,
    code,
    projectConfig.authentication.applicationActiveTimeInMinutes
  )
}

module.exports.getOtpCodeFromRedis = async (phonenumber) => {
  return await getFromRedis(`${OTPCODEKEY}_${phonenumber}`)
}

module.exports.deleteOtpCodeFromRedis = async (phonenumber) => {
  return await deleteFromRedis(`${OTPCODEKEY}_${phonenumber}`)
}

module.exports.getOtpCodeTtlFromRedis = async (phonenumber) => {
  return await getTtlFromRedis(`${OTPCODEKEY}_${phonenumber}`)
}

module.exports.setInvalidPasswordCountOnRedis = async (
  phonenumber,
  invalidCount
) => {
  return await setOnRedis(
    `${INVALIDPASSWORD}_${phonenumber}`,
    invalidCount,
    projectConfig.invalidPasswordOrCode.expiresTimeInMinutes
  )
}

module.exports.getInvalidPasswordCountFromRedis = async (phonenumber) => {
  return await getFromRedis(`${INVALIDPASSWORD}_${phonenumber}`)
}

module.exports.getInvalidPasswordCountTtlFromRedis = async (phonenumber) => {
  return await getTtlFromRedis(`${INVALIDPASSWORD}_${phonenumber}`)
}

module.exports.setResetPasswordHashOnRedis = async (email, hash) => {
  return await setOnRedis(
    `${RESETPASSWORD}_${email}`,
    hash,
    projectConfig.authentication.applicationActiveTimeInMinutes
  )
}

module.exports.getResetPasswordHashFromRedis = async (email) => {
  return await getFromRedis(`${RESETPASSWORD}_${email}`)
}

module.exports.deleteResetPasswordHashFromRedis = async (email) => {
  return await deleteFromRedis(`${RESETPASSWORD}_${email}`)
}

module.exports.getResetPasswordHashTtlFromRedis = async (email) => {
  return await getTtlFromRedis(`${RESETPASSWORD}_${email}`)
}

module.exports.setSalaryFactorOnRedis = async (factorValue) => {
  return await setOnRedis("SalaryFactor", factorValue)
}

module.exports.getSalaryFactorFromRedis = async () => {
  return await getFromRedis("SalaryFactor")
}

module.exports.setDifferenceInPointsForEachGoalFactorOnRedis = async (
  factorValue
) => {
  return await setOnRedis("DifferenceInPointsForEachGoal", factorValue)
}

module.exports.getDifferenceInPointsForEachGoalFactorFromRedis = async () => {
  return await getFromRedis("DifferenceInPointsForEachGoal")
}

module.exports.setMinimumPlayerPriceFactorOnRedis = async (factorValue) => {
  return await setOnRedis("MinimumPlayerPrice", factorValue)
}

module.exports.getMinimumPlayerPriceFactorFromRedis = async () => {
  return await getFromRedis("MinimumPlayerPrice")
}

module.exports.setMaximumPlayerPriceOnRedis = async (factorValue) => {
  return await setOnRedis("MaximumPlayerPrice", factorValue)
}

module.exports.getMaximumPlayerPriceFromRedis = async () => {
  return await getFromRedis("MaximumPlayerPrice")
}

module.exports.setInviteNewTeamCoinCountOnRedis = async (factorValue) => {
  return await setOnRedis("InviteNewTeamCoinCount", factorValue)
}

module.exports.getInviteNewTeamCoinCountFromRedis = async () => {
  return await getFromRedis("InviteNewTeamCoinCount")
}

module.exports.setNumberOfStadiumTicketCoinsOnRedis = async (factorValue) => {
  return await setOnRedis("NumberOfStadiumTicketCoins", factorValue)
}

module.exports.getNumberOfStadiumTicketCoinsFromRedis = async () => {
  return await getFromRedis("NumberOfStadiumTicketCoins")
}

module.exports.addUserToNeedLoginAgainInRedis = async (id) => {
  const needLoginAgain = await getFromRedis(NEEDLOGINAGAIN)
  if (!needLoginAgain.includes(id)) {
    const newNeedLoginAgain = needLoginAgain
      ? needLoginAgain.concat(` , ${id}`)
      : id
    return await setOnRedis(NEEDLOGINAGAIN, newNeedLoginAgain)
  }
  return true
}

module.exports.removeUserFromNeedLoginAgainInRedis = async (id) => {
  const needLoginAgain = await getFromRedis(NEEDLOGINAGAIN)
  const needLoginAgainArray = needLoginAgain.split(" , ")
  const indexOfUserId = needLoginAgainArray.indexOf(id)
  if (indexOfUserId > -1) needLoginAgainArray.splice(indexOfUserId, 1)
  const newNeedLoginAgain = needLoginAgainArray.join(" , ")
  return await setOnRedis(NEEDLOGINAGAIN, newNeedLoginAgain)
}

module.exports.checkUserNeedToLoginAgain = async (id) => {
  const needLoginAgain = await getFromRedis(NEEDLOGINAGAIN)
  return needLoginAgain && needLoginAgain.includes(id) != -1
}
