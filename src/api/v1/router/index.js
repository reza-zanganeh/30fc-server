const appVersion = "v1"
const { errorHandler, notFoundResponse } = require("../helpers/responseHandler")
const { authenticationRouter } = require("./authentication")
module.exports.registerRoutes = (app) => {
  //#region add routes
  app.use(`/api/${appVersion}/authentication`, authenticationRouter)
  //#endregion
  app.use("*", notFoundResponse)
  app.use(errorHandler)
}
