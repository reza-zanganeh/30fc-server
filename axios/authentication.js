const axios = require("axios").default
const { axiosInstance } = require("./axios")
// athentication
const requestToLoginOrRegister = async (phonenumber) => {
  return await axiosInstance.post("/authentication/login-or-register", {
    phonenumber: phonenumber,
    // captchaToken:
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0IjoiT0xjelUiLCJpYXQiOjE2NjQ3ODIwMTMsImV4cCI6MTY2NDc4MjMxM30.NYiR_iOXxuqjh8OvT7Z5zfDdLSQxuxCnyp2IrGVj3no",
    // captchaText: "OLczu",
  })
}

const initialAdminUser = async () => {
  // const otptoken = await requestToLoginOrRegister("09213263325")
  // await stop(2)
  await axiosInstance.post(
    "/authentication/initial-admin",
    {
      phonenumber: "09213263325",
      fullname: "رضا زنگنه",
      password: "123456789",
      confirmPassword: "123456789",
      otpCode: "12345",
    },
    {
      headers: {
        otptoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaXNVc2VyRXhpc3RzIjpmYWxzZSwiaWF0IjoxNjcwNDI1Njg3LCJleHAiOjE2NzA0MjU5ODd9.VGkb8wGNiORADYS0OA2udqkJd67u-W2KYz0IVHMYtJA",
      },
    }
  )
}

const loginRezaAdmin = async () => {
  await axiosInstance.post(
    "/authentication/login",
    {
      password: "123456789",
    },
    {
      headers: {
        otptoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaXNVc2VyRXhpc3RzIjp0cnVlLCJpYXQiOjE2NzA0NDA2MzQsImV4cCI6MTY3MDQ0MDkzNH0.TMoIS3_0iqGRZcOXZSloeghQZW-UYl2vgAnfG5BOK5U",
      },
    }
  )
}

const stop = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000)
  })
}

const register = async (
  fullname,
  phonenumber,
  teamName,
  password,
  otpCode = 12345
) => {
  const otptoken = (await requestToLoginOrRegister(phonenumber)).data.data.token
  await stop(3)
  await axiosInstance.post(
    "/authentication/register",
    {
      otpCode: otpCode,
      fullname: fullname,
      teamName: teamName,
      password: password,
      confirmPassword: password,
    },
    {
      headers: {
        otptoken,
      },
    }
  )
}

const login = async (password) => {
  // const otptoken = (await requestToLoginOrRegister(phonenumber)).data.data.token
  await axiosInstance.post(
    "/authentication/login",
    {
      password,
    },
    {
      headers: {
        otptoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaXNVc2VyRXhpc3RzIjp0cnVlLCJpYXQiOjE2NzA0NDA2MzQsImV4cCI6MTY3MDQ0MDkzNH0.TMoIS3_0iqGRZcOXZSloeghQZW-UYl2vgAnfG5BOK5U",
      },
    }
  )
}

// captcha
const getCaptcha = async () => {
  await axiosInstance.get("/captcha")
}

// const main = async () => {
//   await register("محمد صابری", "03846135678", "مهرباد", "123456")
//   await stop(4)
//   await register("هاشم سمیعی", "03654562135", "زمین", "123456")
//   await stop(4)
//   await register("اصغر عبدی", "09395687854", "کارگران", "123456")
//   await stop(4)
//   await register("صابر ساقی", "03594562135", "ماسال", "123456")
//   await stop(4)
//   await register("کاظم ساقی", "06452135468", "سروستان", "123456")
//   await stop(4)
//   await register("علی حیدری", "09391856421", "اذرخش", "123456")
//   await stop(4)
//   await register("علی افروزی", "09337446566", "اذرباد", "123456")
//   await stop(4)
//   await register("امرالله زنگنه", "09391373284", "طوفان", "123456")
//   await stop(4)
//   await register("مهسا زنگنه", "09397544085", "سیاه جامگان", "123456")
//   await stop(4)
//   await register("ارشیا محرابی", "09369631880", "بدنسازان", "123456")
//   await stop(4)
//   await register("امیر زنگنه", "09391825987", "آزادی", "123456")
//   await stop(4)
//   await register("علی ازاد", "09131565566", "علمدار", "123456")
//   await stop(4)
//   await register("محمد ازاد", "09131565545", "سبز", "123456")
//   await stop(4)
//   await register("کریم", "09131565766", "قرمز", "123456")
//   await stop(4)
//   await register("استاد", "09131565666", "ابی", "123456")
//   await stop(4)
//   await register("سیامک", "09831565566", "سیاه", "123456")
//   await stop(4)
//   await register("هاشم", "09131561566", "هاشوری", "123456")
//   await stop(4)
//   await register("کاظم", "09131565566", "یشمی", "123456")
//   await stop(4)
//   await register("صمد", "09731565566", "کرمی", "123456")
//   await stop(4)
//   await register("حسین", "09131565645", "کاری", "123456")
//   await stop(4)
//   await register("کسیب", "09131565216", "سیرسی", "123456")
//   await stop(4)
//   await register("اسسیبسیب", "09135465666", "ایسبسیببی", "123456")
//   await stop(4)
//   await register("سیامسیبسیبک", "09831565556", "سیاسیبسیبه", "123456")
//   await stop(4)
//   await register("هاشمسیبسیب", "09181561566", "هاشورسیبسیی", "123456")
//   await stop(4)
//   await register("سیبسیبکاظم", "09356421354", "یسیبسیشمی", "123456")
//   await stop(4)
//   await register("سیبسیبکاظم", "09356421554", "بسیشمی", "123456")
//   await stop(4)
//   await register("سیبسیبکاظم", "09356451354", "یسیسیببسیشمی", "123456")
//   await stop(4)
//   await register("سیبسیبکاظم", "09356422354", "یسسیبسییبسیشمی", "123456")
//   await stop(4)
//   await register("سیبسیبکاظم", "09356441354", "لالات", "123456")
//   await stop(4)
//   await register("سیبسیبکاظم", "09356321354", "یسسیشمی", "123456")
//   await register("سمننتمس", "09356454154", "یسیسیببسیشمسیبسی", "123456")
//   await stop(4)
//   await register("سیبسیب", "09357656354", "طزربیسبسی", "123456")
//   await stop(4)
//   await register("سیبسیبسیب", "09356441354", "شسیشسی", "123456")
//   await stop(4)
//   await register("سیبسیبسی", "09356381354", "رطزرطزر", "123456")
//   await register("یبلی", "09356454154", "سیبس", "123456")
//   await stop(4)
//   await register("سسس", "09357656554", "سیبسیب", "123456")
//   await stop(4)
//   await register("شششششششش", "09356441374", "طزرطزر", "123456")
//   await stop(4)
//   await register("بسیبسیب", "09356371354", "شسیشس", "123456")
//   await register("سسسسسسسسسسسسبی", "09356254154", "سیبسیبس", "123456")
//   await stop(4)
//   await register("سسسسسسسسسسس", "09357156554", "یسبسیبسیب", "123456")
//   await stop(4)
//   await register("بلابلا", "09356441274", "شسیشسی", "123456")
//   await stop(4)
//   await register("بلابل", "09356311354", "شسیشسی", "123456")
//   await register("یبل", "09356264154", "یسبیسبش", "123456")
//   await stop(4)
//   await register("یبل", "09354156554", "شسیشسی", "123456")
//   await stop(4)
//   await register("پدودپو", "09356541274", "شسیشسی", "123456")
//   await stop(4)
//   await register("دپو", "09333311354", "شسیشسییی", "123456")

//   await register("سمننتمس", "09356454254", "قفغقفغ", "123456")
//   await stop(4)
//   await register("سیبسیب", "09357655354", "یبل", "123456")
//   await stop(4)
//   await register("سیبسیبسیب", "09356444354", "طزر", "123456")
//   await stop(4)
//   await register("سیبسیبسی", "09356381364", "سیبسیبسیب", "123456")
//   await stop(4)
//   await register("یبلی", "09356454174", "سیبسیب", "123456")
//   await stop(4)
//   await register("سسس", "09357655554", "نمکنمک", "123456")
//   await stop(4)
//   await register("شششششششش", "09376441374", "پو.پو.", "123456")
//   await stop(4)
//   await register("بسیبسیب", "09356381354", "ذپذدپ", "123456")
//   await stop(4)
//   await register("سسسسسسسسسسسسبی", "09356254154", "اتناتن", "123456")
//   await stop(4)
//   await register("سسسسسسسسسسس", "09357157554", "ظیشیسب", "123456")
//   await stop(4)
//   await register("بلابلا", "09353441274", "ثقفثقف", "123456")
//   await stop(4)
//   await register("بلابل", "09356311374", "بلابلا", "123456")
//   await stop(4)
//   await register("یبل", "09356204154", "یسبذدپدذپیسبش", "123456")
//   await stop(4)
//   await register("یبل", "09354156553", "ششسیشسسیشسی", "123456")
//   await stop(4)
//   await register("پدودپو", "09356541874", "یبلیب", "123456")
//   await stop(4)
//   await register("دپو", "09337311354", "یبلی", "123456")
// }

// loginRezaAdmin()

// login("123456")
// requestToLoginOrRegister("09213263325")
// main()

register("محمد صابری", "03846188558", "مهربا21", "123456")
