// common configuration in all enviroments
const OTPCODEEXPIRESTIMEINMINUTE = 4

const jsonwebtoken = {
  tokenKey: "b0a74aa9ef623381e32f9a4579655ad8458f2124b25d704b3ab7aaba96dd8aca",
  refreshTokenKey:
    "666da5bdcf537baf674db0727e0084318b39a7d164034d796c4b917f8d2d3197",
  salt: "f8eae0e5536f33650bc5",
  authenticationTokenExpiresTimeInMinute: 60,
  authenticationTokenExpiresTimeInMilisecond: 3600000,
}

const ghasedak = {
  tokenApi: "47b994dcf39c928389d85c8f1c19bead6ea830800668c994dcc6d7b32d99fa3a",
  verification: {
    template: "otpCode",
    type: "1",
  },
}

const redisExpireTime = {
  otpCode: OTPCODEEXPIRESTIMEINMINUTE,
  resetPassword: 4,
}

const otpCode = {
  length: {
    min: 10000,
    max: 100000,
  },
  expiresTimeInMilisecond: OTPCODEEXPIRESTIMEINMINUTE * 60 * 1000,
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

const arvanCloud = {
  secretKey: "214c0c80b812f5f915dce03c635e85eb9406c9f4c594d9d343da3996085942f4",
  accessKey: "27c2f3e2-5c70-4323-ae89-e13e04f839c4",
  endPointUrl: "https://s3.ir-thr-at1.arvanstorage.com",
  bucket: "hellow-chat",
  expiresTime: 600, //second
}

const paginationTakeItemsCount = {
  reservedTeamName: 40,
}

module.exports = {
  jsonwebtoken,
  ghasedak,
  otpCode,
  redisExpireTime,
  arvanCloud,
  nodemailer,
  google,
  paginationTakeItemsCount,
}
