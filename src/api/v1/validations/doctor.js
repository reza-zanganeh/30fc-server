const { modelName } = require("../../../config/Constant")
const { doctorModelName } = modelName
const {
  required,
  checkExistsObjectWithIdInDb,
  checkAssetInUseWithTeam,
} = require("../helpers/inputValidation")
module.exports.createDoctorSchemaValidation = {
  level: required("سطح پزشک", "body"),
  price: required("هزینه پزشک", "body"),
  ability: required("توانایی پزشک", "body"),
}

module.exports.buyDoctorSchemaValidation = {
  doctorId: checkExistsObjectWithIdInDb(doctorModelName, "body", true, {
    price: true,
  }),
  teamId: required("شناسه تیم", "body"),
}

module.exports.deleteDoctorSchemaValidation = {
  id: checkAssetInUseWithTeam(doctorModelName, "params"),
}

module.exports.useDoctorSchemaValidation = {
  teamId: required("شناسه تیم", "body"),
}
