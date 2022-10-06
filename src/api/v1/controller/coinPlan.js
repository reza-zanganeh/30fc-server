const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const {
  coinPlanModelName,
  teamModelName,
  userModelName,
  coinPurchaseInvoiceModelName,
} = modelName
const { requestToPay, verifyPayment } = require("../services/payment")
const { readOne, create } = require("../helpers/prisma")
const { resposeHandler } = require("../helpers/responseHandler")

module.exports.buyCoin = async (req, res, next) => {
  try {
    const {
      id: coinPlanId,
      price,
      amount,
      discountInPercent,
    } = req[coinPlanModelName.english]
    const { id: teamId, name: teamName } = req[teamModelName.english]
    const { id: userId } = req.user

    const user = await readOne(userModelName.english, { id: +userId })

    const priceToPay =
      discountInPercent == 0 ? price : price - (price * discountInPercent) / 100

    const { status, authority } = await requestToPay(
      priceToPay,
      `خرید ${amount}تیم سکه توسط ${teamName}`,
      {
        email: user.email,
        mobile: user.phonenumber,
      }
    )

    if (status === "success") {
      await create(coinPurchaseInvoiceModelName.english, {
        authority,
        amountInToman: priceToPay,
        teamId: +teamId,
        coinPlanId: +coinPlanId,
      })

      console.log(`https://www.zarinpal.com/pg/StartPay/${authority}`)
      res.redirect(`https://www.zarinpal.com/pg/StartPay/${authority}`)
    } else {
      return next(
        createError(
          InternalServerError(
            "درخواست پرداخت با شکست مواجه شد لطفا دوباره تلاش کنید"
          )
        )
      )
    }
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.completeBuy = async (req, res, next) => {
  try {
    const { Authority, Status } = req.query

    if (Status === "NOK")
      return next(createError(BadRequest("تراکنش خرید سکه نا موفق")))

    const coinPurchaseInvoice = await readOne(
      coinPurchaseInvoiceModelName.english,
      {
        authority: Authority,
      }
    )

    if (!coinPurchaseInvoice)
      return next(createError(BadRequest("تراکنش خرید سکه نا موفق")))

    const { authority, status } = await verifyPayment(
      Authority,
      coinPurchaseInvoice.amountInToman
    )

    // TODO
    // if successfull
    // add coin
    // isPay = true
    //
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
