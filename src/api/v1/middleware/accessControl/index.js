const { hasAccessToAdminOperation } = require("./hasAccessToAdminOperation")
const { hasAccessToPlayer } = require("./hasAccessToPlayer")
const { hasAccessToTeam } = require("./hasAccessToTeam")

module.exports = {
  hasAccessToAdminOperation,
  hasAccessToPlayer,
  hasAccessToTeam,
}
