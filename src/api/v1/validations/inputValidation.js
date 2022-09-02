const { empty, invalid, limitLegth } = require("./validationMessage")
module.exports.email = (location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty("ادرس الکترونیک"),
  },
  isEmail: {
    bail: true,
    errorMessage: invalid("ادرس الکترونیک"),
  },
})

module.exports.password = (location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty("رمز عبور"),
  },
  isLength: {
    errorMessage: limitLegth("رمز عبور", 6),
    options: { min: 6 },
  },
})

module.exports.required = (fieldName, location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty(fieldName),
    checkNull: true,
  },
})
