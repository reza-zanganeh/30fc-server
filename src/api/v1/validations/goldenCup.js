const { required, isBoolean } = require("../helpers/inputValidation")

module.exports.createGoldenCupByAdminSchemaValidation = {
  teamCount: required("ظرفیت جام طلایی برای ثبت نام", "body"),
  registerCostInToman: required("هزینه ثبت نام", "body"),
  registerationOpenForSilverTeam: isBoolean(
    "ثبت نام برای تیم های نقره ای باز است",
    "body"
  ),
  registerationOpenForGoldenTeam: isBoolean(
    "ثبت نام برای تیم های طلایی ای باز است",
    "body"
  ),
  registerationOpenForDiamondTeam: isBoolean(
    "ثبت نام برای تیم های الماسی ای باز است",
    "body"
  ),
}

module.exports.goldenCupIdRequierd = {
  goldenCupId: required("شناسه جام طلایی", "body"),
}
