const HttpStatusCode = {
  Ok: (operationName) => ({
    statusCode: 200,
    message: `${operationName} با موفقیت انجام شد`,
  }),
  Created: (recordName) => ({
    statusCode: 201,
    message: `${recordName} با موفقیت ساخته شد`,
  }),
  BadRequest: () => ({
    statusCode: 400,
    message: "درخواست معتبر نمی باشد لطفا داده های ورودی را کنترل کنید",
  }),
  Unauthorized: (requestName) => ({
    statusCode: 401,
    message: `انجام ${requestName} نیاز به ورود/ثبت نام دارد`,
  }),
  PaymentRequired: (requestName) => ({
    statusCode: 402,
    message: `انجام ${requestName} نیازمند پرداخت وجه است`,
  }),
  Forbidden: (requestName) => ({
    statusCode: 403,
    message: `شما دسترسی لازم برای انجام ${requestName} را ندارید`,
  }),
  NotFound: (requestName) => ({
    statusCode: 404,
    message: `درخواست ${requestName} پیدا نشد`,
  }),
  TooManyRequests: (requestName) => ({
    statusCode: 429,
    message: "تعداد درخواست های شما زیاد است",
  }),
  InternalServerError: () => ({
    statusCode: 500,
    message:
      "سرور دچار مشکل داخلی شده است . لطفا صبور باشید در حال حل مشکل هستیم",
  }),
  ServiceUnavailable: (serviceName) => ({
    statusCode: 503,
    message: `سرویس ${serviceName} در دسترس نمی باشد`,
  }),
};

module.exports = HttpStatusCode;
