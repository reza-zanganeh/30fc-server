const { required } = require("../helpers/inputValidation")

module.exports.createCoinPlanSchemaValidation = {
  amount: required("مقدار سکه", "body"),
  price: required("قیمت سکه ها", "body"),
  discountInPercent: required(
    "میزان تخفیف به درصد ( می تواند 0 باشد )",
    "body"
  ),
}
