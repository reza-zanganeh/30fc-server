const {
  required,
  inArray,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { compositionModelName } = modelName
module.exports.createTeamSchemaValidation = {
  teamName: required("نام تیم", "body"),
}
module.exports.changeCompositionSchemaValidation = {
  teamId: required("شناسه تیم", "body"),
  compositionId: checkExistsObjectWithIdInDb(
    compositionModelName,
    "body",
    true,
    {
      Goalkeaper_No: true,
      Defender_Left: true,
      Defender_One: true,
      Defender_Two: true,
      Defender_Three: true,
      Defender_Right: true,
      Midfielder_Left: true,
      Midfielder_One: true,
      Midfielder_Two: true,
      Midfielder_Three: true,
      Midfielder_Right: true,
      Attacker_Left: true,
      Attacker_One: true,
      Attacker_Two: true,
      Attacker_Three: true,
      Attacker_Right: true,
    }
  ),
}

module.exports.changeTwoPlayerPositionSchemaValidation = {
  playerOneId: required("شناسه بازیکن اول", "body"),
  playerTwoId: required("شناسه بازیکن دوم", "body"),
  teamId: required("شناسه تیم", "body"),
}
