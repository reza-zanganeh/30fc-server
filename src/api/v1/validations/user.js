const { checkExistsObjectWithIdInDb } = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { userModelName } = modelName
module.exports.blockAndUnBlockUserSchemaValidation = {
  userId: checkExistsObjectWithIdInDb(userModelName, "body", true, {
    fullname: true,
    isBlock: true,
  }),
}
