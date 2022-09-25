const HttpStatusCode = {
  Ok: (operationName) => ({
    statusCode: 200,
    message: `${operationName} با موفقیت انجام شد`,
  }),
  Created: (recordName) => ({
    statusCode: 201,
    message: `${recordName} با موفقیت ساخته شد`,
  }),
  BadRequest: (additionalInfo) => ({
    statusCode: 400,
    message: additionalInfo
      ? additionalInfo
      : "درخواست معتبر نمی باشد لطفا داده های ورودی را کنترل کنید",
  }),
  Unauthorized: (requestName) => ({
    statusCode: 401,
    message: `انجام ${requestName || "این عملیات"} نیاز به ثبت نام / ورود دارد`,
  }),
  PaymentRequired: (requestName) => ({
    statusCode: 402,
    message: `انجام ${requestName} نیازمند پرداخت وجه است`,
  }),
  Forbidden: (requestName) => ({
    statusCode: 403,
    message: `شما دسترسی لازم برای انجام ${
      requestName || "این عملیات"
    } را ندارید`,
  }),
  NotFound: () => ({
    statusCode: 404,
    message: "مسیر مورد نظر یافت نشد",
  }),
  TooManyRequests: () => ({
    statusCode: 429,
    message: "تعداد درخواست های شما زیاد است",
  }),
  InternalServerError: (message) => ({
    statusCode: 500,
    message:
      message ||
      "سرور دچار مشکل داخلی شده است . لطفا صبور باشید در حال حل مشکل هستیم",
  }),
  ServiceUnavailable: (serviceName) => ({
    statusCode: 503,
    message: `سرویس ${serviceName} در دسترس نمی باشد`,
  }),
}

module.exports = HttpStatusCode
