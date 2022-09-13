const { BadRequest } = require("../../helpers/HttpResponse")
const { createError } = require("../../helpers/Functions")

module.exports.hasAccessToPlayWithApp = (req, res, next) => {
  const { isBlock } = req?.user
  if (isBlock)
    return next(
      createError(
        BadRequest(
          "کاربر گرامی حساب شما توسط ادمین مسدود شده است لطفا به ادمین پیام دهید"
        )
      )
    )

  next()
}
