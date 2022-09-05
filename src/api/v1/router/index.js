const appVersion = "v1"
const { errorHandler, notFoundResponse } = require("../helpers/responseHandler")
const { isAuthenticate } = require("../middleware/athentication")
const { isAdmin } = require("../middleware/isAdmin")
const { authenticationRouter } = require("./authentication")
const { reservedTeamNameRouter } = require("./reservedTeamName")
const { playerFacePictureRouter } = require("./playerFacePicture")
const { compositionRouter } = require("./composition")
const { primitivePlayerNameRouter } = require("./primitivePlayerName")
const { primitivePlayerAgeRouter } = require("./PrimitivePlayerAge")
module.exports.registerRoutes = (app) => {
  //#region add routes
  app.use(`/api/${appVersion}/authentication`, authenticationRouter)
  app.use(
    `/api/${appVersion}/reserved-team-name`,
    isAuthenticate,
    isAdmin,
    reservedTeamNameRouter
  )
  app.use(
    `/api/${appVersion}/player-face-picture`,
    isAuthenticate,
    isAdmin,
    playerFacePictureRouter
  )
  app.use(
    `/api/${appVersion}/composition`,
    isAuthenticate,
    isAdmin,
    compositionRouter
  )
  app.use(
    `/api/${appVersion}/primitive-player-name`,
    isAuthenticate,
    isAdmin,
    primitivePlayerNameRouter
  )
  app.use(
    `/api/${appVersion}/primitive-player-age`,
    isAuthenticate,
    isAdmin,
    primitivePlayerAgeRouter
  )
  //#endregion
  app.use("*", notFoundResponse)
  app.use(errorHandler)
}
