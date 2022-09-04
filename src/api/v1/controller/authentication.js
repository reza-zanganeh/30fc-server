const bcrypt = require("bcrypt")
const crypto = require("crypto")
const {
  createUser,
  findUser,
  updateUserByUserId,
} = require("../dataLogic/user")
const {
  createError,
  createRandomNumber,
  createOtpCodeToken,
  createAuthenticationToken,
  convertSecondToMinAndScond,
} = require("../helpers/Functions")
const {
  BadRequest,
  InternalServerError,
  ServiceUnavailable,
  Created,
  Ok,
} = require("../helpers/HttpResponse")
const {
  getOtpCodeFromRedis,
  getOtpCodeTtlFromRedis,
  setOtpCodeOnRedis,
  deleteOtpCodeFromRedis,
  getResetPasswordHashFromRedis,
  getResetPasswordHashTtlFromRedis,
  setResetPasswordHashOnRedis,
  deleteResetPasswordHashFromRedis,
} = require("../services/redis")
const { sendResetPasswordHash } = require("../services/email")
const { sendOtpCode } = require("../services/sms")
const { resposeHandler } = require("../helpers/responseHandler")
const projectConfig = require("../../../config/index")
module.exports.requestOtp = async (req, res, next) => {
  try {
    const { phonenumber } = req.body

    const userIsExists = await findUser({ phonenumber })

    if (userIsExists)
      return next(
        createError(
          BadRequest(
            "این شماره همراه قبلا ثبت شده است لطفا در صورتی که رمز عبور خود را فراموش کرده اید از قسمت فراموشی رمز عبور ان را بازیابی کنید"
          )
        )
      )

    const requestRemainTime = await getOtpCodeTtlFromRedis(phonenumber)
    const otpRequestIsActiveForUser = requestRemainTime !== -2

    if (otpRequestIsActiveForUser) {
      const { minute, second } = convertSecondToMinAndScond(requestRemainTime)
      return next(
        createError(
          BadRequest(
            `شما درخواست رمز اعتبار سنجی فعال دارید لطفا ${minute} دقیقه و ${second} ثانیه صبر کنید`
          )
        )
      )
    }

    const randomNumber = createRandomNumber(
      projectConfig.otpCode.length.min,
      projectConfig.otpCode.length.max
    )

    const saveOtpOnRedisResult = await setOtpCodeOnRedis(
      phonenumber,
      randomNumber
    )

    if (!saveOtpOnRedisResult) {
      // TODO email to admin to check redis
      return next(createError(InternalServerError()))
    }

    sendOtpCode(phonenumber, randomNumber)

    const token = createOtpCodeToken(phonenumber)

    resposeHandler(
      res,
      {
        token,
        expiresTime: projectConfig.otpCode.expiresTimeInMilisecond,
      },
      {
        message: "کد اعتبار سنجی با موفقیت به تلفن همراه شما ارسال شد",
      }
    )
  } catch (error) {
    return next(
      createError(ServiceUnavailable("درخواست کد اعتبار سنجی").message)
    )
  }
}

module.exports.register = async (req, res, next) => {
  try {
    const { phonenumber, email, fullname, password, otpCode } = req.body

    const code = await getOtpCodeFromRedis(phonenumber)

    if (!code)
      return next(
        createError(BadRequest("مدت اعتبار کد اعتبار سنجی به پایان رسیده است"))
      )

    if (otpCode != code)
      return next(createError(BadRequest("کد اعتبار سنجی صحیح نمی باشد")))

    const newUser = await createUser(phonenumber, email, fullname, password)

    const token = createAuthenticationToken(
      newUser.id,
      newUser.level,
      newUser.isBlock
    )

    deleteOtpCodeFromRedis(phonenumber)

    resposeHandler(
      res,
      {
        token,
        expiresTime:
          projectConfig.jsonwebtoken.authenticationTokenExpiresTimeInMilisecond,
      },
      Created("کاربر")
    )
  } catch (error) {
    if (error.code == "P2002") {
      return next(
        createError(
          BadRequest(
            "این شماره همراه قبلا ثبت شده است لطفا در صورتی که رمز عبور خود را فراموش کرده اید از قسمت فراموشی رمز عبور ان را بازیابی کنید"
          )
        )
      )
    }
    next(createError(InternalServerError()))
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password: inputPassword } = req.body

    const user = await findUser({
      email,
    })

    const password = user.password

    const resultOfcomparePassword = await bcrypt.compare(
      inputPassword,
      password
    )

    if (!resultOfcomparePassword) {
      return next(createError(BadRequest("رمز عبور یا ایمیل اشتباه است")))
    }
    // if true create and send token
    const token = createAuthenticationToken(user.id, user.level, user.isBlock)
    // 7. send token in response
    resposeHandler(
      res,
      {
        token,
        expiresTime:
          projectConfig.jsonwebtoken.authenticationTokenExpiresTimeInMilisecond,
      },
      Ok("ورود")
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.requestToResetPassword = async (req, res, next) => {
  try {
    const redirectUrl = req.body?.redirectUrl
    const { email } = req.body
    // check email to not regsitered before
    const user = await findUser({ email })
    if (!user)
      return next(createError(BadRequest("کاربری با این ایمیل وجود ندارد")))

    const userId = user.id

    const requestRemainTime = await getResetPasswordHashTtlFromRedis(email)
    const resetPasswordRequestIsActiveForUser = requestRemainTime !== -2

    if (resetPasswordRequestIsActiveForUser) {
      const { minute, second } = convertSecondToMinAndScond(requestRemainTime)
      return next(
        createError(
          BadRequest(
            `شما درخواست بازیابی رمز عبور فعال دارید لطفا ${minute} دقیقه و ${second} ثانیه صبر کنید`
          )
        )
      )
    }

    const hash = crypto.randomBytes(32).toString("hex")
    const saveResetPasswordCodeOnRedisResult =
      await setResetPasswordHashOnRedis(email, hash)
    // send email to admin to test redis server is ok
    if (!saveResetPasswordCodeOnRedisResult)
      return next(createError(InternalServerError()))

    sendResetPasswordHash(user.email, userId, hash, redirectUrl)
    resposeHandler(res, {}, Ok("درخواست بازیابی رمز عبور"))
  } catch (error) {
    // send email to admin to check for this error
    console.log(error)
    return next(createError(InternalServerError()))
  }
}

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { userId, hash } = req.params

    const user = await findUser({ id: +userId })

    if (!user)
      return next(createError(BadRequest("کاربری با این id وجود ندارد")))

    const email = user.email

    const savedHash = await getResetPasswordHashFromRedis(email)
    if (!savedHash)
      return next(
        createError(
          BadRequest("مدت اعتبار توکن بازیابی رمز عبور به پایان رسیده است")
        )
      )

    if (savedHash !== hash)
      return next(
        createError(BadRequest("توکن بازیابی رمز عبور معتبر نمی باشد"))
      )

    const { newPassword, confirmNewPassword } = req.body

    if (newPassword !== confirmNewPassword)
      return next(
        createError(
          createError(BadRequest("رمز جدید با تایید رمز جدید یکسان نمی باشد"))
        )
      )

    await updateUserByUserId(userId, { password: newPassword })

    deleteResetPasswordHashFromRedis(email)

    resposeHandler(res, {}, Ok("بازیابی رمز عبور"))
  } catch (error) {
    console.log(error)
    next(createError(InternalServerError()))
  }
}
