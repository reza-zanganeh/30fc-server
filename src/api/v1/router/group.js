const express = require("express")
const { checkSchema } = require("express-validator")
const { expressValidationResultHandler } = require("../helpers/responseHandler")
const { modelName } = require("../../../config/Constant")
const { groupModelName } = modelName
const {
  createGroup,
  addDeputyToGroup,
  searchOnGroupsBaseOnName,
  getGroups,
  joinToTheGroup,
  leftTheGroup,
  dismissalFromTheDeputyGroup,
  blockMemberByAdmin,
  commentOnGroupPost,
  getMemberOfGroup,
  likePostOnGroup,
  disLikePostOnGroup,
} = require("../controller/group")
const { updateConrtoller } = require("../helpers/controllerCRUDoperation")(
  groupModelName
)
const {
  createGroupSchemaValidation,
  addDeputyToGroupSchemaValidation,
  searchOnGroupsBaseOnNameSchemaValidation,
  groupExistsOnDb,
  changeGroupNameSchemaValidation,
  changeGroupBioSchemaValidation,
  changeGroupAccessSchemaValidation,
  commentOnPostSchemaValidation,
  getSortedGroupsWithPaginationSchemaValidation,
} = require("../validations/group")
const {
  hasAccessToSpecialMemberOperation,
  hasAccessToTeam,
} = require("../middleware/accessControl")
const { accessToGroup } = require("../middleware/chatAccessControl/group")
const groupRouter = express.Router()

groupRouter.post(
  "/",
  hasAccessToTeam,
  hasAccessToSpecialMemberOperation.bind(null, ["Silver", "Golden", "Diamond"]),
  checkSchema(createGroupSchemaValidation),
  expressValidationResultHandler,
  createGroup
)

groupRouter.post(
  "/post",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin", "Deputy"])
)

groupRouter.post(
  "/deputy",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin"]),
  checkSchema(addDeputyToGroupSchemaValidation),
  expressValidationResultHandler,
  addDeputyToGroup
)

groupRouter.post(
  "/join/:groupId",
  hasAccessToTeam,
  checkSchema(groupExistsOnDb("params")),
  expressValidationResultHandler,
  joinToTheGroup
)

groupRouter.post(
  "/left/:groupId",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Member"]),
  leftTheGroup
)

groupRouter.post(
  "/dismissal-deputy/:deputyId",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin"]),
  dismissalFromTheDeputyGroup
)

groupRouter.post(
  "/block/:memberId",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin"]),
  blockMemberByAdmin
)

groupRouter.get(
  "/search",
  checkSchema(searchOnGroupsBaseOnNameSchemaValidation),
  expressValidationResultHandler,
  searchOnGroupsBaseOnName
)

groupRouter.patch(
  "/name",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin"]),
  checkSchema(changeGroupNameSchemaValidation),
  expressValidationResultHandler,
  updateConrtoller.bind(null, ["name"])
)

groupRouter.patch(
  "/bio",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin"]),
  checkSchema(changeGroupBioSchemaValidation),
  expressValidationResultHandler,
  updateConrtoller.bind(null, ["bio"])
)

groupRouter.patch(
  "/access",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin"]),
  checkSchema(changeGroupAccessSchemaValidation),
  expressValidationResultHandler,
  updateConrtoller.bind(null, ["access"])
)

groupRouter.post(
  "/comment",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin", "Deputy", "Normal"]),
  checkSchema(commentOnPostSchemaValidation),
  expressValidationResultHandler,
  commentOnGroupPost
)

groupRouter.post(
  "/like/:id",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin", "Deputy", "Normal"]),
  likePostOnGroup
)

groupRouter.post(
  "/dislike/:id",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin", "Deputy", "Normal"]),
  disLikePostOnGroup
)

groupRouter.get(
  "/",
  checkSchema(getSortedGroupsWithPaginationSchemaValidation),
  expressValidationResultHandler,
  getGroups
)

groupRouter.get(
  "/members",
  hasAccessToTeam,
  accessToGroup.bind(null, ["Admin", "Deputy"]),
  getMemberOfGroup
)

module.exports.groupRouter = groupRouter
