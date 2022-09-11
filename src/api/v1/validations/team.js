const {
  required,
  inArray,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { compositionModelName } = modelName
module.exports.createTeamSchemaValidation = {
  name: required("نام تیم", "body"),
  compositionId: required("ترکیب تیم", "body"),
  technique: inArray("تکنیک", "body", ["DEFEND", "MODERATE", "ATTACK"]),
  strategy: inArray("استراتژی", "body", [
    "PRESS",
    "SHORT_PASS",
    "LONG_PASS",
    "COUNTER_ATTACK",
    "KEEP_BALL",
  ]),
}
module.exports.changeCompositionSchemaValidation = {
  teamId: required("شناسه تیم", "body"),
  compositionId: checkExistsObjectWithIdInDb(
    compositionModelName,
    "body",
    true,
    {
      GOALKEAPER_NO: true,
      DEFENDER_LEFT: true,
      DEFENDER_ONE: true,
      DEFENDER_TWO: false,
      DEFENDER_THREE: true,
      DEFENDER_RIGHT: true,
      MIDFIELDER_LEFT: false,
      MIDFIELDER_ONE: true,
      MIDFIELDER_TWO: true,
      MIDFIELDER_THREE: true,
      MIDFIELDER_RIGHT: false,
      ATTACKER_LEFT: false,
      ATTACKER_ONE: true,
      ATTACKER_TWO: true,
      ATTACKER_THREE: true,
      ATTACKER_RIGHT: false,
    }
  ),
}
