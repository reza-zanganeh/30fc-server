const {
  required,
  checkExistsObjectWithIdInDb,
} = require("../helpers/inputValidation")
const { modelName } = require("../../../config/Constant")
const { coinPlanModelName } = modelName
module.exports.createCoinPlanSchemaValidation = {
  amount: required("مقدار سکه", "body"),
  price: required("قیمت سکه ها", "body"),
  discountInPercent: required(
    "میزان تخفیف به درصد ( می تواند 0 باشد )",
    "body"
  ),
}

module.exports.buyCoinSchemaValdation = {
  coinPlanId: checkExistsObjectWithIdInDb(coinPlanModelName, "body", true, {
    amount: true,
    discountInPercent: true,
    price: true,
  }),
  teamId: required("شناسه تیم", "body"),
}
