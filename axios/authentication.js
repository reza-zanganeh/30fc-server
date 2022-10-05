const { axiosInstance } = require("./axios")
// athentication
const requestToLoginOrRegister = async () => {
  await axiosInstance.post("/authentication/login-or-register", {
    phonenumber: "09391825987",
    // captchaToken:
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXh0IjoiT0xjelUiLCJpYXQiOjE2NjQ3ODIwMTMsImV4cCI6MTY2NDc4MjMxM30.NYiR_iOXxuqjh8OvT7Z5zfDdLSQxuxCnyp2IrGVj3no",
    // captchaText: "OLczu",
  })
}

const initialAdminUser = async () => {
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
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaWF0IjoxNjY0Nzg1MzMwLCJleHAiOjE2NjQ3ODU2MzB9.76226gt16EARvLpmqHFEy3JXfISSmcPsnf1dYjEChQQ",
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MjEzMjYzMzI1IiwiaWF0IjoxNjY0ODcwODI5LCJleHAiOjE2NjQ4NzExMjl9.lQ2SHrKjAnzLX_J0ueARHMkvg-G75faHJkuukjLEWG4",
      },
    }
  )
}

const loginRezaEtehadi = async () => {
  await axiosInstance.post(
    "/authentication/login",
    {
      password: "1234567",
    },
    {
      headers: {
        otptoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MzkxODI1OTg3IiwiaXNVc2VyRXhpc3RzIjp0cnVlLCJpYXQiOjE2NjQ5NDQ1NjksImV4cCI6MTY2NDk0NDg2OX0.4ftb-Xzfg7uB9d0HwHihlW_kkAEHtdcc6h4r5WB_3vY",
      },
    }
  )
}

const register = async () => {
  await axiosInstance.post(
    "/authentication/register",
    {
      otpCode: "12345",
      fullname: "رضا اتحادی",
      teamName: "اذرخش",
      password: "123456",
      confirmPassword: "123456",
    },
    {
      headers: {
        otptoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZW51bWJlciI6IjA5MzkxODI1OTg3IiwiaXNVc2VyRXhpc3RzIjpmYWxzZSwiaWF0IjoxNjY0OTAzNDUyLCJleHAiOjE2NjQ5MDM3NTJ9.qBAcOHA_X2fMRV1iL1a_Bq-4Eso64XKwqg94DnzDL_0",
      },
    }
  )
}

// captcha
const getCaptcha = async () => {
  await axiosInstance.get("/captcha")
}

// register()
// requestToLoginOrRegister()
// loginRezaAdmin()
loginRezaEtehadi()
