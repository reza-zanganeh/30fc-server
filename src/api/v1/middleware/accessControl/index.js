const { hasAccessToAdminOperation } = require("./hasAccessToAdminOperation")
const { hasAccessToPlayWithApp } = require("./hasAccessToPlayWithApp")
const { hasAccessToPlayer } = require("./hasAccessToPlayer")
const { hasAccessToTeam } = require("./hasAccessToTeam")

module.exports = {
  hasAccessToAdminOperation,
  hasAccessToPlayWithApp,
  hasAccessToPlayer,
  hasAccessToTeam,
}
