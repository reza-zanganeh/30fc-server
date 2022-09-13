const { modelName } = require("../../../config/Constant")
const { energyProducerModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
} = require("../helpers/inputValidation")
module.exports.createEnergyProducerSchemaValidation = {
  level: required("سطح انرژی زا", "body"),
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
