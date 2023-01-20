const { readOne } = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const { groupMemberModelName } = modelName
module.exports.isMemberOfGroup = async (teamId, groupId) => {
  try {
    const isMember = await readOne(groupMemberModelName.english, {
      groupId,
      teamId,
    })
    return isMember !== null
  } catch (error) {
    throw error
  }
}
