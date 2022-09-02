// common configuration in all enviroments
const jsonwebtoken = {
  tokenKey: "b0a74aa9ef623381e32f9a4579655ad8458f2124b25d704b3ab7aaba96dd8aca",
  refreshTokenKey:
    "666da5bdcf537baf674db0727e0084318b39a7d164034d796c4b917f8d2d3197",
  salt: "f8eae0e5536f33650bc5",
  authenticationTokenExpiresTimeInMinute: 60,
};

module.exports = {
  jsonwebtoken,
};
