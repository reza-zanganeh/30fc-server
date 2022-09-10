const { BadRequest } = require("../helpers/HttpResponse")
const { createError } = require("../helpers/Functions")

module.exports.checkUserNotBlocked = (req, res, next) => {
  const { isBlock } = req?.user
  if (!isBlock) next()
  else
    return next(
      createError(
        BadRequest(
          "کاربر گرامی حساب شما توسط ادمین مسدود شده است لطفا به ادمین پیام دهید"
        )
      )
    )
}
