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
  const otptoken = (await requestToLoginOrRegister("09213263325")).data.data
    .token
  await stop(2)
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
        otptoken,
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaXNVc2VyRXhpc3RzIjp0cnVlLCJpYXQiOjE2Njg5Njc1NzUsImV4cCI6MTY2ODk2Nzg3NX0._p3czGdhA45EAVJHfai0nhaEg1oF_BRSstv5Ybyf3rU",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MzM3MzExMzU0IiwiaXNVc2VyRXhpc3RzIjp0cnVlLCJpYXQiOjE2Njg5NzA1NzUsImV4cCI6MTY2ODk3MDg3NX0.O6cAUNOchF4DBqi9izM4xfkCIX6_sAmCqp4vWqrQOk4",
      },
    }
  )
}

// captcha
const getCaptcha = async () => {
  await axiosInstance.get("/captcha")
}

// requestToLoginOrRegister("09213263325")
// loginRezaAdmin()

// initialAdminUser()

/*
accounts : 
admin :
  phonenumber: "09213263325",
  fullname: "رضا زنگنه",
  password: "123456789",
users :
  1:
  phonenumber: "09391825987",
  fullname: "امیر زنگنه",
  password: "123456789",
  team : "آزادی"
  token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6Ik5vcm1hbCIsImlzQmxvY2siOmZhbHNlLCJpYXQiOjE2NjUwNTk2MTYsImV4cCI6MTY2NTE0NjAxNn0.AD2mS2mBDO7KtQATOCGURrmOvX5wNR31a3QBXZ-q8r0",
  */
// register("امیر زنگنه", "09391825987", "آزادی", "123456")
/*
  2:
  phonenumber: "09911161545",
  fullname: "رضا اتحاد",
  password: "123456",
  team : "سلاطین"
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZSI6Ik5vcm1hbCIsImlzQmxvY2siOmZhbHNlLCJpYXQiOjE2NjUwNTk3MjUsImV4cCI6MTY2NTE0NjEyNX0.N16hR6tX95G7_EFGAJUmlY8y3LrxJmN4R4gJw_rsl04",
  3:
    */
// register("رضا اتحاد", "09911161545", "سلاطین", "123456")
/*
  phonenumber: "09369631880",
  fullname: "ارشیا محرابی",
  password: "123456",
  team : "بدنسازان"
  token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6Ik5vcm1hbCIsImlzQmxvY2siOmZhbHNlLCJpYXQiOjE2NjUwNTk3ODUsImV4cCI6MTY2NTE0NjE4NX0.zWqDx0jTzaVdmW7x1UoXp835mW2APvl2M0GExmPvK6U",
    */
// register("ارشیا محرابی", "09369631880", "بدنسازان", "123456")
/*
  4:
  phonenumber: "09397544085",
  fullname: "مهسا زنگنه",
  password: "123456",
  team : "سیاه جامگان"
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDU5ODUyLCJleHAiOjE2NjUxNDYyNTJ9.GVmACjaXA27vVVsQTKBBD2LHYJ6JT3PwiyBosjqWDmg",
  */
// register("مهسا زنگنه", "09397544085", "سیاه جامگان", "123456")
/*
  5:
  phonenumber: "09376092314",
  fullname: "پریسا زنگنه",
  password: "123456",
  team : "دریا"
  token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDU5OTE5LCJleHAiOjE2NjUxNDYzMTl9.uA4EAmqps8w-tu8gCbEK6l7XfbNc0oP09nS6X3s5Rb4",
    */
// register("پریسا زنگنه", "09376092314", "دریا", "123456")
/*
  6:
  phonenumber: "09391373284",
  fullname: "امرالله زنگنه",
  password: "123456",
  team : "طوفان"
    */
// register("امرالله زنگنه", "09391373284", "طوفان", "123456")
/*
  7:
  phonenumber: "09159716049",
  fullname: "علیرضا عربی",
  password: "123456",
  team : "باد"
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwMTM4LCJleHAiOjE2NjUxNDY1Mzh9.uGqARB1b2gvP3nA-iscoq9Pibvy532RxAYvLZWykYQU"
      */
// register("علیرضا عربی", "09159716049", "باد", "123456")
/*
  8:
  phonenumber: "09337446566",
  fullname: "علی افروزی",
  password: "123456",
  team : "اذرباد"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwMTk5LCJleHAiOjE2NjUxNDY1OTl9.ry1-WnEU770ZZKLdzZ-gAhFs0nR0JsSU4PBAsSWI3wM",
          */
// register("علی افروزی", "09337446566", "اذرباد", "123456")
/*
  9:
  phonenumber: "09361326542",
  fullname: "حسن یزدانی",
  password: "123456",
  team : "کشتی گیران"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwMjYwLCJleHAiOjE2NjUxNDY2NjB9.Nfc0Eitcl674q-K5gh7cEX55sZkuaF_5pCoCjQ2NesM",
              */
// register("حسن یزدانی", "09361326542", "کشتی گیران", "123456")
/*
  10:
  phonenumber: "09391856421",
  fullname: "علی حیدری",
  password: "123456",
  team : "اذرخش"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwMzU2LCJleHAiOjE2NjUxNDY3NTZ9.ADUpXBR6uLODuc_vAe3QuoNrA657EIIVByVp3HKTs6o",
                  */
// register("علی حیدری", "09391856421", "اذرخش", "123456")
/*
  11:
  phonenumber: "06452135468",
  fullname: "کاظم ساقی",
  password: "123456",
  team : "سروستان"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwNDE1LCJleHAiOjE2NjUxNDY4MTV9._14YAu6jWaeU3YEF6VvWR3KZok-NSaiEsm9QpVVhabo",
                      */
// register("کاظم ساقی", "06452135468", "سروستان", "123456")
/*
  12:
  phonenumber: "03594562135",
  fullname: "صابر ساقی",
  password: "123456",
  team : "ماسال"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwNTAxLCJleHAiOjE2NjUxNDY5MDF9.T_S4kolJzMpT5w2sAOJ5QrQHWGh7yDILVQ37PB8Cggg",
                          */
// register("صابر ساقی", "03594562135", "ماسال", "123456")
/*
  13:
  phonenumber: "03846135678",
  fullname: "محمد صابری",
  password: "123456",
  team : "مهرباد"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwNTg4LCJleHAiOjE2NjUxNDY5ODh9.yYXyNJHT7MoKAk_wm8lFw6ZeHAd5Z6KmXpuKBy60l_U",
                              */
// register("محمد صابری", "03846135678", "مهرباد", "123456")
/*
  14:
  phonenumber: "03654562135",
  fullname: "هاشم سمیعی",
  password: "123456",
  team : "زمین"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwNjcwLCJleHAiOjE2NjUxNDcwNzB9.DBopUdrTZtgvv08UhduTrGt3ERRgFaNNllb3evMpLvw",
                              */
// register("هاشم سمیعی", "03654562135", "زمین", "123456")
/*
  15:
  phonenumber: "09395687854",
  fullname: "اصغر عبدی",
  password: "123456",
  team : "کارگران"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY1MDYwNzI2LCJleHAiOjE2NjUxNDcxMjZ9.fb0R5i_lGQ0wdJrh8Qmc3SCoDQu8LNQ0DfNZEW4jP3c",
                                  */
// register("اصغر عبدی", "09395687854", "کارگران", "123456")
/*
 */
const main = async () => {
  // await register("محمد صابری", "03846135678", "مهرباد", "123456")
  // await stop(4)
  // await register("هاشم سمیعی", "03654562135", "زمین", "123456")
  // await stop(4)
  // await register("اصغر عبدی", "09395687854", "کارگران", "123456")
  // await stop(4)
  // await register("صابر ساقی", "03594562135", "ماسال", "123456")
  // await stop(4)
  // await register("کاظم ساقی", "06452135468", "سروستان", "123456")
  // await stop(4)
  // await register("علی حیدری", "09391856421", "اذرخش", "123456")
  // await stop(4)
  // await register("علی افروزی", "09337446566", "اذرباد", "123456")
  // await stop(4)
  // await register("امرالله زنگنه", "09391373284", "طوفان", "123456")
  // await stop(4)
  // await register("مهسا زنگنه", "09397544085", "سیاه جامگان", "123456")
  // await stop(4)
  // await register("ارشیا محرابی", "09369631880", "بدنسازان", "123456")
  // await stop(4)
  // await register("امیر زنگنه", "09391825987", "آزادی", "123456")
  // await stop(4)
  // await register("علی ازاد", "09131565566", "علمدار", "123456")
  // await stop(4)
  // await register("محمد ازاد", "09131565545", "سبز", "123456")
  // await stop(4)
  // await register("کریم", "09131565766", "قرمز", "123456")
  // await stop(4)
  // await register("استاد", "09131565666", "ابی", "123456")
  // await stop(4)
  // await register("سیامک", "09831565566", "سیاه", "123456")
  // await stop(4)
  // await register("هاشم", "09131561566", "هاشوری", "123456")
  // await stop(4)
  // await register("کاظم", "09131565566", "یشمی", "123456")
  // await stop(4)
  // await register("صمد", "09731565566", "کرمی", "123456")
  // await stop(4)
  // await register("حسین", "09131565645", "کاری", "123456")
  // await stop(4)
  // await register("کسیب", "09131565216", "سیرسی", "123456")
  // await stop(4)
  // await register("اسسیبسیب", "09135465666", "ایسبسیببی", "123456")
  // await stop(4)
  // await register("سیامسیبسیبک", "09831565556", "سیاسیبسیبه", "123456")
  // await stop(4)
  // await register("هاشمسیبسیب", "09181561566", "هاشورسیبسیی", "123456")
  // await stop(4)
  // await register("سیبسیبکاظم", "09356421354", "یسیبسیشمی", "123456")
  // await stop(4)
  // await register("سیبسیبکاظم", "09356421554", "بسیشمی", "123456")
  // await stop(4)
  // await register("سیبسیبکاظم", "09356451354", "یسیسیببسیشمی", "123456")
  // await stop(4)
  // await register("سیبسیبکاظم", "09356422354", "یسسیبسییبسیشمی", "123456")
  // await stop(4)
  // await register("سیبسیبکاظم", "09356441354", "لالات", "123456")
  // await stop(4)
  // await register("سیبسیبکاظم", "09356321354", "یسسیشمی", "123456")
  // new
  // await register("سمننتمس", "09356454154", "یسیسیببسیشمسیبسی", "123456")
  // await stop(4)
  // await register("سیبسیب", "09357656354", "طزربیسبسی", "123456")
  // await stop(4)
  // await register("سیبسیبسیب", "09356441354", "شسیشسی", "123456")
  // await stop(4)
  // await register("سیبسیبسی", "09356381354", "رطزرطزر", "123456")
  // await register("یبلی", "09356454154", "سیبس", "123456")
  // await stop(4)
  // await register("سسس", "09357656554", "سیبسیب", "123456")
  // await stop(4)
  // await register("شششششششش", "09356441374", "طزرطزر", "123456")
  // await stop(4)
  // await register("بسیبسیب", "09356371354", "شسیشس", "123456")
  // await register("سسسسسسسسسسسسبی", "09356254154", "سیبسیبس", "123456")
  // await stop(4)
  // await register("سسسسسسسسسسس", "09357156554", "یسبسیبسیب", "123456")
  // await stop(4)
  // await register("بلابلا", "09356441274", "شسیشسی", "123456")
  // await stop(4)
  // await register("بلابل", "09356311354", "شسیشسی", "123456")
  // await register("یبل", "09356264154", "یسبیسبش", "123456")
  // await stop(4)
  // await register("یبل", "09354156554", "شسیشسی", "123456")
  // await stop(4)
  // await register("پدودپو", "09356541274", "شسیشسی", "123456")
  // await stop(4)
  // await register("دپو", "09333311354", "شسیشسییی", "123456")

  await register("سمننتمس", "09356454254", "قفغقفغ", "123456")
  await stop(4)
  await register("سیبسیب", "09357655354", "یبل", "123456")
  await stop(4)
  await register("سیبسیبسیب", "09356444354", "طزر", "123456")
  await stop(4)
  await register("سیبسیبسی", "09356381364", "سیبسیبسیب", "123456")
  await stop(4)
  await register("یبلی", "09356454174", "سیبسیب", "123456")
  await stop(4)
  await register("سسس", "09357655554", "نمکنمک", "123456")
  await stop(4)
  await register("شششششششش", "09376441374", "پو.پو.", "123456")
  await stop(4)
  await register("بسیبسیب", "09356381354", "ذپذدپ", "123456")
  await stop(4)
  await register("سسسسسسسسسسسسبی", "09356254154", "اتناتن", "123456")
  await stop(4)
  await register("سسسسسسسسسسس", "09357157554", "ظیشیسب", "123456")
  await stop(4)
  await register("بلابلا", "09353441274", "ثقفثقف", "123456")
  await stop(4)
  await register("بلابل", "09356311374", "بلابلا", "123456")
  await stop(4)
  await register("یبل", "09356204154", "یسبذدپدذپیسبش", "123456")
  await stop(4)
  await register("یبل", "09354156553", "ششسیشسسیشسی", "123456")
  await stop(4)
  await register("پدودپو", "09356541874", "یبلیب", "123456")
  await stop(4)
  await register("دپو", "09337311354", "یبلی", "123456")
}

// loginRezaAdmin()

login("123456")
// requestToLoginOrRegister("09337311354")
