const { hasAccessToAdminOperation } = require("./hasAccessToAdminOperation")
const { hasAccessToPlayer } = require("./hasAccessToPlayer")
const { hasAccessToTeam } = require("./hasAccessToTeam")
const {
  hasAccessToSpecialMemberOperation,
} = require("./hasAccessToSpecialMemberOperation")

module.exports = {
  hasAccessToAdminOperation,
  hasAccessToPlayer,
  hasAccessToTeam,
  hasAccessToSpecialMemberOperation,
}
