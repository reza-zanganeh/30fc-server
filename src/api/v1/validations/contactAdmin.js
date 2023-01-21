const { required } = require("../helpers/inputValidation")

module.exports.contactUsSchemaValidation = {
  fullname: required("نام و نام خانوادگی", "body"),
  phonenumber: required("شماره تلفن همراه", "body"),
  messageTitle: required("عنوان پیام", "body"),
  messageContext: required("متن پیام", "body"),
}

module.exports.responseToContactUsMessageSchemaValidation = {
  adminResponse: required("پاسخ ادمین", "body"),
}

module.exports.createTicketSchemaValidation = {
  title: required("عنوان تیکت", "body"),
}

module.exports.sendOrEditTicketMessageSchemaValidation = {
  message: required("متن پیام", "body"),
}
