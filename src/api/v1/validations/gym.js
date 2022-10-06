const { modelName } = require("../../../config/Constant")
const { gymModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
  inArray,
  between,
} = require("../helpers/inputValidation")
module.exports.createGymSchemaValidation = {
  level: between("سطح باشگاه", "body", 0, 9),
  price: required("هزینه اجاره باشگاه", "body"),
  capacity: required("ظرفیت باشگاه", "body"),
}

module.exports.buyGymSchemaValidation = {
  gymId: checkExistsObjectWithIdInDb(gymModelName, "body", true, {
    price: true,
  }),
  teamId: required("شناسه تیم", "body"),
}

module.exports.deleteGymSchemaValidation = {
  id: checkAssetInUseWithTeam(gymModelName, "params"),
}

module.exports.useGymSchemaValidation = {
  playerId: required("شناسه بازیکن", "body"),
  teamId: required("شناسه تیم", "body"),
  power: inArray("قدرت", "body", [
    "spead",
    "controll",
    "pass",
    "flexibility",
    "stamina",
    "technique",
    "shoot",
    "drible",
    "focus",
    "experience",
  ]),
}
