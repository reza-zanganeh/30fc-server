const { modelName } = require("../../../config/Constant")
const { coachModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
} = require("../helpers/inputValidation")
module.exports.createCoachSchemaValidation = {
  level: required("سطح مربی", "body"),
  price: required("هزینه اجاره مربی", "body"),
  ability: required("توانای مربی", "body"),
}

module.exports.buyCoachSchemaValidation = {
  coachId: checkExistsObjectWithIdInDb(coachModelName, "body", true, {
    price: true,
  }),
  teamId: required("شناسه تیم", "body"),
}

module.exports.deleteCoachSchemaValidation = {
  id: checkAssetInUseWithTeam(coachModelName, "params"),
}
