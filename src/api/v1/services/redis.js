const redis = require("redis")
const projectConfig = require("../../../config/index")

const client = redis.createClient(
  projectConfig.redis.host,
  projectConfig.redis.port
)

client.on("error", (err) => {
  // TODO email to admin to redis server
})

client.connect()

const OTPCODEKEY = "OTPCODE"
const RESETPASSWORD = "RESETPASSWORD"

const setOnRedis = async (key, value, expiresIn = 1) => {
  return await client.set(key, value, { EX: expiresIn * 60 })
}

const getFromRedis = async (key) => {
  return await client.get(key)
}

const removeFromRedis = async (key) => {
  return await client.del(key)
}

const getTtlFromRedis = async (key) => {
  return await client.ttl(key)
}

module.exports.setOtpCodeOnRedis = async (phonenumber, code) => {
  return await setOnRedis(
    `${OTPCODEKEY}_${phonenumber}`,
    code,
    projectConfig.redisExpireTime.otpCode
  )
}

module.exports.getOtpCodeFromRedis = async (phonenumber) => {
  return await getFromRedis(`${OTPCODEKEY}_${phonenumber}`)
}

module.exports.removeOtpCodeFromRedis = async (phonenumber) => {
  return await removeFromRedis(`${OTPCODEKEY}_${phonenumber}`)
}

module.exports.getOtpCodeTtlFromRedis = async (phonenumber) => {
  return await getTtlFromRedis(`${OTPCODEKEY}_${phonenumber}`)
}

module.exports.setResetPasswordHashOnRedis = async (email, hash) => {
  return await setOnRedis(
    `${RESETPASSWORD}_${email}`,
    hash,
    projectConfig.redisExpireTime.resetPassword
  )
}

module.exports.getResetPasswordHashFromRedis = async (email) => {
  return await getFromRedis(`${RESETPASSWORD}_${email}`)
}

module.exports.removeResetPasswordHashFromRedis = async (email) => {
  return await removeFromRedis(`${RESETPASSWORD}_${email}`)
}

module.exports.getResetPasswordHashTtlFromRedis = async (email) => {
  return await getTtlFromRedis(`${RESETPASSWORD}_${email}`)
}
