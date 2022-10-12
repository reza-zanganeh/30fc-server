const { modelName } = require("../../../config/Constant")
const { energyProducerModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
  between,
} = require("../helpers/inputValidation")
module.exports.createEnergyProducerSchemaValidation = {
  level: between("سطح انرژی زا", "body", 0, 9),
  price: required("هزینه انرژی زا", "body"),
  ability: required("توانایی انرژی زا", "body"),
}

module.exports.deleteEnergyProducerSchemaValidation = {
  id: checkAssetInUseWithTeam(energyProducerModelName, "params"),
}

module.exports.useEnergyProducerSchemaValidation = {
  teamId: required("شناسه تیم", "body"),
  energyId: checkExistsObjectWithIdInDb(energyProducerModelName, "body", true, {
    price: true,
    ability: true,
  }),
}
