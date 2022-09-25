const axios = require("axios").default
const { zarinPall } = require("../../../config/index")
module.exports.requestToPay = async (amountInToman, description, user) => {
  const { email, mobile } = user
  const response = await axios.post(zarinPall.paymentRequestUrl, {
    merchant_id: zarinPall.MerchantID,
    amount: amountInToman,
    callback_url: zarinPall.callbackUrl,
    description,
    metadata: { email, mobile },
  })

  const noError = response.data.errors.length === 0
  if (noError) {
    return {
      status: "success",
      authority: response.data.data.authority,
    }
  } else {
    return {
      status: "faild",
    }
  }
}

module.exports.verifyPayment = async (authority, amount) => {
  const response = axios.post(zarinPall.verifyPaymentUrl, {
    merchant_id: zarinPall.MerchantID,
    authority,
    amount,
  })
  console.log(response)

  const noError = response.data.errors.length === 0
  if (noError) {
    return {
      status: "success",
      authority: response.data.data.authority,
    }
  } else {
    return {
      status: "faild",
    }
  }
}
