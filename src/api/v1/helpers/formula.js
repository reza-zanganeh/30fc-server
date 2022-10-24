const { getSalaryFactorFromRedis } = require("../services/redis")
module.exports.calculatePlayerSalary = async (totalPower, age) => {
  const ageFactor = 1 + 0.1 * (37 - age)
  const salaryFactor = await getSalaryFactorFromRedis()
  const salary = Math.round(totalPower * ageFactor * salaryFactor)
  return salary
}

module.exports.calculatePlayerPositionFactor = (
  position,
  positionInMainComposition
) => {
  const manorPositionInMainComposition =
    positionInMainComposition.manor === "One" ||
    positionInMainComposition.manor === "Two" ||
    positionInMainComposition.manor === "Three"
      ? "Middle"
      : positionInMainComposition.manor
  if (position.major !== positionInMainComposition.major) return 0.5
  else if (position.manor !== manorPositionInMainComposition) return 0.9
  else return 1
}
