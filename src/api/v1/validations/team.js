const { required, inArray } = require("../helpers/inputValidation")
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
