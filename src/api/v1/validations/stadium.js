const { modelName } = require("../../../config/Constant")
const { stadiumModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
} = require("../helpers/inputValidation")

module.exports.createStadiumSchemaValidation = {
  level: required("سطح استادیوم", "body"),
  price: required("هزینه اجاره استادیوم", "body"),
  capacity: required("ظرفیت استادیوم", "body"),
}

module.exports.buyStadiumSchemaValidation = {
  stadiumId: checkExistsObjectWithIdInDb(stadiumModelName, "body", true, {
    price: true,
  }),
  teamId: required("شناسه تیم", "body"),
}

module.exports.deleteStadiumSchemaValidation = {
  id: checkAssetInUseWithTeam(stadiumModelName, "params"),
}
