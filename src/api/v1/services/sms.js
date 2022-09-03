const Ghasedak = require("ghasedak")
const projectConfig = require("../../../config/index")
const ghasedak = new Ghasedak(projectConfig.ghasedak.tokenApi)
module.exports.sendOtpCode = (phonenumber, code) => {
  ghasedak.verification({
    receptor: phonenumber,
    type: projectConfig.ghasedak.verification.type,
    template: projectConfig.ghasedak.verification.template,
    param1: code,
  })
}
