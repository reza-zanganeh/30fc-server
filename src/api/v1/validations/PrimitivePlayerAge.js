const { between } = require("../helpers/inputValidation")
const { sumOfArrayElements, createError } = require("../helpers/Functions")
const { InternalServerError, BadRequest } = require("../helpers/HttpResponse")
const { gameSettings } = require("../../../config/Constant")
const {
  minimumPrimitiveAgeOfPalyer,
  maximumPrimitiveAgeOfPalyer,
  AverageAgeOfPlayers,
} = gameSettings
module.exports.createPrimitivePlayerAgeSchemaValidation = {
  one: between(
    "سن بازیکن اول",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  two: between(
    "سن بازیکن دوم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  three: between(
    "سن بازیکن سوم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  four: between(
    "سن بازیکن چهارم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  five: between(
    "سن بازیکن پنجم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  six: between(
    "سن بازیکن ششم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  seven: between(
    "سن بازیکن هفتم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  eight: between(
    "سن بازیکن هشتم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  nine: between(
    "سن بازیکن نهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  ten: between(
    "سن بازیکن دهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  eleven: between(
    "سن بازیکن یازدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  twelve: between(
    "سن بازیکن دوازدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  thirteen: between(
    "سن بازیکن سیزدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  fourteen: between(
    "سن بازیکن چهاردهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  fifteen: between(
    "سن بازیکن پانزدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  sixteen: between(
    "سن بازیکن شانزدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  seventeen: between(
    "سن بازیکن هفدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  eighteen: between(
    "سن بازیکن هجدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  nineteen: between(
    "سن بازیکن نونزدهم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
  twenty: between(
    "سن بازیکن بیستم",
    "body",
    minimumPrimitiveAgeOfPalyer,
    maximumPrimitiveAgeOfPalyer
  ),
}

module.exports.checkAgesAverage = (req, res, next) => {
  try {
    const ages = req.body
    const avg = sumOfArrayElements(Object.values(ages)) / 20
    if (avg !== AverageAgeOfPlayers)
      return next(
        createError(
          BadRequest(
            `میانگین سن ها باید برابر ${AverageAgeOfPlayers} باشد (${avg})`
          )
        )
      )

    next()
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
