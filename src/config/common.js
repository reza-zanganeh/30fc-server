// common configuration in all enviroments
const ghasedak = {
  tokenApi: "47b994dcf39c928389d85c8f1c19bead6ea830800668c994dcc6d7b32d99fa3a",
  verification: {
    template: "otpCode",
    type: "1",
  },
}

const authentication = {
  tokenKey: "b0a74aa9ef623381e32f9a4579655ad8458f2124b25d704b3ab7aaba96dd8aca",
  refreshTokenKey:
    "666da5bdcf537baf674db0727e0084318b39a7d164034d796c4b917f8d2d3197",
  salt: "f8eae0e5536f33650bc5",
  authenticationTokenExpiresTimeInMinute: 1440,
  authenticationTokenExpiresTimeInMilisecond: 86400000,
  applicationActiveTimeInMinutes: 5,
  applicationActiveTimeInMiliSeconds: 300000,
}

const captcha = {
  length: 6,
  tokenKey: "a04beb0937024a0428c8956ed6f77a64040687ee1f6998604d9d27cef962319e",
}

const otpCode = {
  minimum: 10000,
  maximum: 100000,
  tokenKey: "f4ef94e8d97efd031f49470971b5d01aad4946c4ea5fdd5713c396f977293248",
}

const invalidPasswordOrCode = {
  numberOfOpportunitiesToEnterTheWrongPasswordOrCode: 5,
  expiresTimeInMinutes: 60,
}

const google = {
  clientId:
    "203602521149-sd83467rm9kkh9fc572i5qot6di4f1oa.apps.googleusercontent.com",
  clientSecret: "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",
  refreshToken:
    "1//04GMJqMp84Os0CgYIARAAGAQSNwF-L9IrwjGiFmVeNnigLoLYGd4A9LoYhvJJzc0z4cSz79_mbiwrxgpw3hbI-Z34gei4oDpY1gY",
  redirectUrl: "https://developers.google.com.oauthplayground",
}

const nodemailer = {
  user: "resassid@gmail.com",
  pass: "09391825987",
}

const cloud = {
  secretKey: "214c0c80b812f5f915dce03c635e85eb9406c9f4c594d9d343da3996085942f4",
  accessKey: "27c2f3e2-5c70-4323-ae89-e13e04f839c4",
  endPointUrl: "https://s3.ir-thr-at1.arvanstorage.com",
  bucket: {
    playerFacePicture: "football-manager-player-face-picture",
    userProfilePicture: "football-manager-user-profile-picture",
  },
  expiresTime: 240, //second
  maximumFileSize: 128000,
}

const zarinPall = {
  paymentRequestUrl: "https://api.zarinpal.com/pg/v4/payment/request.json",
  verifyPaymentUrl: "https://api.zarinpal.com/pg/v4/payment/verify.json",
  MerchantID: "f5ab7c6e-6bb4-11e8-b4ed-005056a205be",
  callbackUrl: "http://localhost:3000/api/v1/coin-plan/complete-buy",
}

module.exports = {
  ghasedak,
  otpCode,
  cloud,
  nodemailer,
  google,
  zarinPall,
  authentication,
  captcha,
  invalidPasswordOrCode,
}
