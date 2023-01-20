const { modelName } = require("../../../../config/Constant")
const { createError } = require("../../helpers/Functions")
const { BadRequest, Forbidden } = require("../../helpers/HttpResponse")
const { readOne } = require("../../helpers/prisma")
const { internalServerErrorHandler } = require("../../helpers/responseHandler")
const { teamModelName, groupMemberModelName } = modelName

module.exports.accessToGroup = async (validRoles, req, res, next) => {
  try {
    const { groupId } = req.body
    if (!groupId)
      return next(createError(BadRequest("شناسه گروه مورد نظر ارسال نشده است")))
    const group = await readOne(+groupId)
    if (!group)
      return next(
        createError(BadRequest("شناسه گروه ارسال شده معتبر نمی باشد"))
      )
    const { id: teamId } = req[teamModelName.english]
    const member = await readOne(groupMemberModelName.english, {
      groupId: +groupId,
      teamId: +teamId,
    })

    if (
      (member && validRoles.includes(member.role)) ||
      (group.access === "Public" && validRoles.includes("Public"))
    ) {
      req[groupMemberModelName.english] = group
      next()
    } else return next(createError(Forbidden()))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
