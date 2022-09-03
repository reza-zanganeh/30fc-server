const envMode = process.env.mode || process.env.MODE || "local"
const projectConfig = require(`./${envMode}.js`)
const commonConfig = require("./common.js")
module.exports = {
  ...projectConfig,
  ...commonConfig,
  envMode,
}
