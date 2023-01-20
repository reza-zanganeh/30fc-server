const {
  required,
  inArray,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { groupModelName } = modelName
module.exports.createGroupSchemaValidation = {
  name: required("نام گروه", "body"),
  bio: required("بیو گروه", "body"),
  accessType: inArray("نوع دسترسی گروه", "body", ["Private", "Public"]),
}

module.exports.addDeputyToGroupSchemaValidation = {
  deputyId: required("شناسه تیم معاون", "body"),
}

module.exports.searchOnGroupsBaseOnNameSchemaValidation = {
  key: required("کلید جستجو بین گروه ها", "query"),
}

module.exports.groupExistsOnDb = (location) => ({
  groupId: checkExistsObjectWithIdInDb(groupModelName, location, true),
})

module.exports.changeGroupNameSchemaValidation = {
  name: required("نام جدید گروه", "body"),
}

module.exports.changeGroupBioSchemaValidation = {
  bio: required("توضیحات جدید گروه", "body"),
}

module.exports.changeGroupAccessSchemaValidation = {
  access: inArray("نوع دسترسی گروه", "body", ["Private", "Public"]),
}

module.exports.commentOnPostSchemaValidation = {
  postId: required("شناسه پست", "body"),
  text: required("متن کامنت", "body"),
}

module.exports.getSortedGroupsWithPaginationSchemaValidation = {
  page: required("صفحه", "query"),
  sort: inArray("نوع مرتب سازی", "query", ["mostMember", "newly", "alphabet"]),
}
