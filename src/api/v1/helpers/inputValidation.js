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

module.exports.phonenumber = (location) => ({
  in: ["body"],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty("شماره همراه"),
  },
  custom: {
    options: (value) => {
      return /^0[0-9]{10}$/i.test(value)
    },
    errorMessage: invalid("شماره همراه"),
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

module.exports.isBoolean = (fieldName, location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkNull: true,
    },
    errorMessage: empty(fieldName),
    checkNull: true,
  },
})

module.exports.fileType = (location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty("نوع فایل"),
  },
  custom: {
    options: (value) => {
      return value === "jpeg" || value === "png"
    },
    errorMessage: "فقط از فایل با نوع jpeg | png پشتیبانی می کنیم",
  },
})

module.exports.fileSize = (location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty("سایز فایل"),
  },
  custom: {
    options: (value) => {
      return value < 128
    },
    errorMessage: "سایز فایل حداکثر باید 128 کیلوبایت باشد",
  },
})

module.exports.fileName = (location) => ({
  in: [location],
  exists: {
    bail: true,
    options: {
      checkFalsy: true,
      checkNull: true,
    },
    errorMessage: empty("نام فایل"),
  },
  custom: {
    options: (value, { req }) => {
      if (
        (req.body.fileType === "jpeg" || req.body.fileType === "png") &&
        value.endsWith("." + req.body.fileType)
      )
        return true
      else return false
    },
    errorMessage: "( jpeg || png ) نام فایل باید بهمراه نوع ان باشد",
  },
})
