const appVersion = "v1"
const { errorHandler, notFoundResponse } = require("../helpers/responseHandler")
const { isAuthenticate } = require("../middleware/athentication")
const { isAdmin } = require("../middleware/isAdmin")
const { authenticationRouter } = require("./authentication")
const { reservedTeamNameRouter } = require("./reservedTeamName")
module.exports.registerRoutes = (app) => {
  //#region add routes
  app.use(`/api/${appVersion}/authentication`, authenticationRouter)
  app.use(
    `/api/${appVersion}/reserved-team-name`,
    isAuthenticate,
    isAdmin,
    reservedTeamNameRouter
  )
  //#endregion
  app.use("*", notFoundResponse)
  app.use(errorHandler)
}
