const { inArray } = require("../helpers/inputValidation")
module.exports.createPlayerPositionSchemaValidation = {
  major: inArray("موقعیت اصلی بازیکن", "body", [
    "GOALKEAPER",
    "DEFENDER",
    "MIDFIELDER",
    "ATTACKER",
  ]),
  manor: inArray("موقعیت جزیی بازیکن", "body", [
    "LEFT",
    "ONE",
    "TWO",
    "THREE",
    "RIGHT",
    "MIDDLE",
    "NO",
  ]),
}
