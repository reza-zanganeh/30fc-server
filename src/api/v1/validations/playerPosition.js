const { inArray } = require("../helpers/inputValidation")
module.exports.createPlayerPositionSchemaValidation = {
  major: inArray("موقعیت اصلی بازیکن", "body", [
    "Goalkeaper",
    "Defender",
    "Midfielder",
    "Attacker",
  ]),
  manor: inArray("موقعیت جزیی بازیکن", "body", [
    "Left",
    "One",
    "Two",
    "Three",
    "Right",
    "Middle",
    "No",
  ]),
}
