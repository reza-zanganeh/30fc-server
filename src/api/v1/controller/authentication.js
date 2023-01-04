const crypto = require("crypto")
const { readOne, update, readAll, create } = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const { userModelName } = modelName
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
  Created,
  Ok,
  ForbiddenBlockUser,
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
  getRequestToLoginTtlFromRedis,
  setRequestToLoginOnRedis,
  getInviteNewTeamCoinCountFromRedis,
  setInvalidPasswordCountOnRedis,
  getInvalidPasswordCountFromRedis,
  getInvalidPasswordCountTtlFromRedis,
} = require("../services/redis")
const { createTeamWithOwnerPrismaQuery } = require("../prismaQuery/team")
const {
  createDataTeam,
  validateTeamName,
} = require("../modelHelperFunction/team")
const {
  compareUserPassword,
  hashUserPassword,
} = require("../modelHelperFunction/user")
const { internalServerErrorHandler } = require("../helpers/responseHandler")
const { sendResetPasswordHash } = require("../services/email")
const { sendOtpCode } = require("../services/sms")
const { resposeHandler } = require("../helpers/responseHandler")
const projectConfig = require("../../../config/index")

module.exports.initialAdminUser = async (req, res, next) => {
  try {
    const users = await readAll(userModelName.english)
    if (users.length > 0)
      return next(
        createError(BadRequest("کاربر گرامی ادمین اولیه ساخته شده است"))
      )

    const { fullname, password, confirmPassword, otpCode } = req.body
    const { phonenumber } = req.otpData

    const code = await getOtpCodeFromRedis(phonenumber)

    if (!code)
      return next(
        createError(BadRequest("مدت اعتبار کد اعتبار سنجی به پایان رسیده است"))
      )

    if (otpCode != code)
      return next(createError(BadRequest("کد اعتبار سنجی صحیح نمی باشد")))

    if (password !== confirmPassword)
      return next(
        createError(
          BadRequest("رمز عبور شما با تایید رمز عبور شما یکسان نمی باشد")
        )
      )

    const firstAdmin = await create(userModelName.english, {
      phonenumber,
      fullname,
      password: await hashUserPassword(password),
      role: "Admin",
    })

    const token = createAuthenticationToken(firstAdmin.id, "Admin", false)

    deleteOtpCodeFromRedis(phonenumber)
    resposeHandler(
      res,
      {
        token,
        expiresTime:
          projectConfig.authentication
            .authenticationTokenExpiresTimeInMilisecond,
      },
      Created("کاربر")
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.requestToLoginOrRegister = async (req, res, next) => {
  try {
    const { phonenumber } = req.body

    const user = await readOne(userModelName.english, { phonenumber })

    let token
    if (user) {
      // request to login
      if (user.isBlock) return next(createError(ForbiddenBlockUser()))

      const requestToLoginRemainingTime = await getRequestToLoginTtlFromRedis(
        phonenumber
      )
      const userHasActiveRequestToLogin = requestToLoginRemainingTime !== -2

      if (userHasActiveRequestToLogin) {
        const { minute, second } = convertSecondToMinAndScond(
          requestToLoginRemainingTime
        )
        return next(
          createError(
            BadRequest(
              `شما درخواست ورود فعال دارید لطفا ${minute} دقیقه و ${second} ثانیه صبر کنید`
            )
          )
        )
      }

      await setRequestToLoginOnRedis(phonenumber)

      token = createOtpCodeToken(phonenumber, true)
    } else {
      // reuqest to register
      const requestToRegisterRemainingTime = await getOtpCodeTtlFromRedis(
        phonenumber
      )
      const userHasActiveRequestToRegister =
        requestToRegisterRemainingTime !== -2

      if (userHasActiveRequestToRegister) {
        const { minute, second } = convertSecondToMinAndScond(
          requestToRegisterRemainingTime
        )
        return next(
          createError(
            BadRequest(
              `شما درخواست رمز اعتبار سنجی فعال دارید لطفا ${minute} دقیقه و ${second} ثانیه صبر کنید`
            )
          )
        )
      }

      let randomNumber
      // TODO uncomment this line when buy ghasedak account
      // const randomNumber = createRandomNumber(
      //   projectConfig.otpCode.minimum,
      //   projectConfig.otpCode.maximum
      // )
      randomNumber = "12345"

      await setOtpCodeOnRedis(phonenumber, randomNumber)
      // TODO uncomment this line when buy ghasedak account
      // sendOtpCode(phonenumber, randomNumber)
      token = createOtpCodeToken(phonenumber, false)
    }

    resposeHandler(
      res,
      {
        token,
        expiresTime:
          projectConfig.authentication.applicationActiveTimeInMiliSeconds,
        ...(user && { fullname: user.fullname }),
      },
      {
        message: "کد اعتبار سنجی با موفقیت به تلفن همراه شما ارسال شد",
      }
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.register = async (req, res, next) => {
  try {
    const {
      fullname,
      teamName,
      password,
      confirmPassword,
      introductionCode,
      otpCode,
    } = req.body
    const { phonenumber, isUserExists } = req.otpData
    if (isUserExists)
      return next(
        createError(
          BadRequest(
            "این اطلاعات قبلا ثبت شده است لطفا در صورتی که رمز عبور خود را فراموش کرده اید از قسمت فراموشی رمز عبور ان را بازیابی کنید"
          )
        )
      )

    const code = await getOtpCodeFromRedis(phonenumber)

    if (!code)
      return next(
        createError(BadRequest("مدت اعتبار کد اعتبار سنجی به پایان رسیده است"))
      )

    if (otpCode != code)
      return next(createError(BadRequest("کد اعتبار سنجی صحیح نمی باشد")))

    if (password !== confirmPassword)
      return next(
        createError(
          BadRequest("رمز عبور شما با تایید رمز عبور شما یکسان نمی باشد")
        )
      )

    const {
      isValid: isValidTeamName,
      errorMessage: invalidTeamNameErrorMessage,
    } = await validateTeamName(teamName)

    if (!isValidTeamName)
      return next(createError(BadRequest(invalidTeamNameErrorMessage)))

    let introducingUser
    if (introductionCode) {
      introducingUser = await readOne(
        userModelName.english,
        {
          id: +introductionCode,
        },
        { id: true, coinCount: true }
      )
      if (!introducingUser)
        return next(
          createError(
            BadRequest("کاربری که بعنوان معرف معرفی کرده اید وجود ندارد")
          )
        )
    }

    // create user and team
    const {
      players,
      compositionId,
      defaultStadiumFacilitiesId,
      defaultStadiumId,
      strategy,
      technique,
    } = await createDataTeam(teamName)
    const hashedPass = await hashUserPassword(password)
    const createdTeam = await createTeamWithOwnerPrismaQuery(
      teamName,
      compositionId,
      strategy,
      technique,
      defaultStadiumFacilitiesId,
      defaultStadiumId,
      players,
      {
        phonenumber,
        fullname,
        password: hashedPass,
      }
    )
    // add gift coin to introducingUser
    if (introducingUser) {
      const inviteNewTeamCoinCount = await getInviteNewTeamCoinCountFromRedis()
      await update(
        userModelName.english,
        { id: +introducingUser },
        { coinCount: introducingUser.coinCount + inviteNewTeamCoinCount }
      )
    }
    // create token
    const token = createAuthenticationToken(
      createdTeam.ownerId,
      "Normal",
      false
    )

    deleteOtpCodeFromRedis(phonenumber)
    resposeHandler(
      res,
      {
        token,
        expiresTime:
          projectConfig.authentication
            .authenticationTokenExpiresTimeInMilisecond,
      },
      Created("کاربر")
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { password: inputPassword } = req.body
    const { phonenumber } = req.otpData
    const user = await readOne(userModelName.english, {
      phonenumber,
    })

    if (!user) return next(createError(BadRequest("حساب کاربری شما یافت نشد")))

    if (user.isBlock) return next(createError(ForbiddenBlockUser()))

    const enterInvalidPasswordCount =
      +(await getInvalidPasswordCountFromRedis(phonenumber)) || 0
    if (
      enterInvalidPasswordCount >
      projectConfig.invalidPasswordOrCode
        .numberOfOpportunitiesToEnterTheWrongPasswordOrCode
    ) {
      const { minute, second } = convertSecondToMinAndScond(
        await getInvalidPasswordCountTtlFromRedis(phonenumber)
      )
      return next(
        createError(
          BadRequest(
            `صبر کنید حساب کاربری شما مسدود است لطفا ${minute} دقیقه و ${second} ثانیه صبر کنید`
          )
        )
      )
    }

    const password = user.password

    const resultOfcomparePassword = await compareUserPassword(
      inputPassword,
      password
    )

    if (!resultOfcomparePassword) {
      await setInvalidPasswordCountOnRedis(
        phonenumber,
        enterInvalidPasswordCount + 1
      )
      return next(
        createError(
          BadRequest(
            enterInvalidPasswordCount ===
              projectConfig.invalidPasswordOrCode
                .numberOfOpportunitiesToEnterTheWrongPasswordOrCode
              ? "کاربر گرامی حساب شما مسدود گردید"
              : `کاربرگرامی درصورت وارد کردن ${
                  5 - enterInvalidPasswordCount
                } رمز اشتباه دیگر حساب شما به مدت ${
                  projectConfig.invalidPasswordOrCode.expiresTimeInMinutes
                } دقیقه مسدود خواهد شد لطفا دقت کنید`
          )
        )
      )
    }
    // if true create and send token
    const token = createAuthenticationToken(user.id, user.role, user.isBlock)
    // 7. send token in response
    resposeHandler(
      res,
      {
        token,
        expiresTime:
          projectConfig.authentication
            .authenticationTokenExpiresTimeInMilisecond,
      },
      Ok({ operationName: "ورود" })
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

// TODO refactor requestToResetPassword and resetPassword when get sms panel base on sms
module.exports.requestToResetPassword = async (req, res, next) => {
  try {
    const redirectUrl = req.body?.redirectUrl
    const { email } = req.body
    // check email to not regsitered before
    const user = await readOne(userModelName.english, { email })
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
    resposeHandler(res, {}, Ok({ operationName: "درخواست بازیابی رمز عبور" }))
  } catch (error) {
    // send email to admin to check for this error
    return next(createError(InternalServerError()))
  }
}

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { userId, hash } = req.params

    const user = await readOne(userModelName.english, { id: +userId })

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

    resposeHandler(res, {}, Ok({ operationName: "بازیابی رمز عبور" }))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
