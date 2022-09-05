const { isBoolean, required } = require("../helpers/inputValidation")
module.exports.createCompositionSchemaValidation = {
  goalKeaper: isBoolean("دربازه بان", "body"),
  leftDefender: isBoolean("مدافع سمت چپ", "body"),
  middle1Defender: isBoolean("مدافع وسط 1", "body"),
  middle2Defender: isBoolean("مدافع وسط 2", "body"),
  middle3Defender: isBoolean("مدافع وسط 3", "body"),
  rightDefender: isBoolean("مدافع سمت راست", "body"),
  leftMidfielder: isBoolean("هافبک سمت چپ", "body"),
  middle1Midfielder: isBoolean("هافبک وسط 1", "body"),
  middle2Midfielder: isBoolean("هافبک وسط 2", "body"),
  middle3Midfielder: isBoolean("هافبک وسط 3", "body"),
  rightMidfielder: isBoolean("هافبک سمت راست", "body"),
  leftAttacker: isBoolean("مهاجم سمت راست", "body"),
  middle1Attacker: isBoolean("مهاجم وسط 1", "body"),
  middle2Attacker: isBoolean("مهاجم وسط 2", "body"),
  middle3Attacker: isBoolean("مهاجم وسط 3", "body"),
  rightAttacker: isBoolean("مهاجم سمت راست", "body"),
  score: isBoolean("امتیاز ترکیب"),
}

module.exports.deleteCompositionSchemaValidation = {
  id: required("شناسه ترکیب", "params"),
}
