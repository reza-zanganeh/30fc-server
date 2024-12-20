const { modelName } = require("../../../config/Constant")
const { psychologistModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
  between,
} = require("../helpers/inputValidation")
module.exports.createPsychologisSchemaValidation = {
  level: between("سطح روانپزشک", "body", 0, 9),
  price: required("هزینه روانپزشک", "body"),
  ability: required("توانایی روانپزشک", "body"),
}

module.exports.buyPsychologisSchemaValidation = {
  psychologisId: checkExistsObjectWithIdInDb(
    psychologistModelName,
    "body",
    true,
    {
      price: true,
    }
  ),
  teamId: required("شناسه تیم", "body"),
}

module.exports.deletePsychologisSchemaValidation = {
  id: checkAssetInUseWithTeam(psychologistModelName, "params"),
}

module.exports.usePsychologisSchemaValidation = {
  teamId: required("شناسه تیم", "body"),
}
