const { getSalaryFactorFromRedis } = require("../services/redis")
module.exports.calculatePlayerSalary = async (totalPower, age) => {
  const ageFactor = 1 + 0.1 * (37 - age)
  const salaryFactor = await getSalaryFactorFromRedis()
  const salary = Math.round(totalPower * ageFactor * salaryFactor)
  return salary
}
