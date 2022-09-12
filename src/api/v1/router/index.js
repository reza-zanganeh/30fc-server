const appVersion = "v1"
const { errorHandler, notFoundResponse } = require("../helpers/responseHandler")
const { isAuthenticate } = require("../middleware/athentication")
const { isAdmin } = require("../middleware/isAdmin")
const { checkUserNotBlocked } = require("../middleware/checkUserNotBlocked")
const { authenticationRouter } = require("./authentication")
const { reservedTeamNameRouter } = require("./reservedTeamName")
const { playerFacePictureRouter } = require("./playerFacePicture")
const { compositionRouter } = require("./composition")
const { primitivePlayerNameRouter } = require("./primitivePlayerName")
const { primitivePlayerAgeRouter } = require("./PrimitivePlayerAge")
const { playerPositionRouter } = require("./playerPosition")
const { primitivePlayerPowerRouter } = require("./primitivePlayerPower")
const { playerRouter } = require("./player")
const { teamRouter } = require("./team")
const { userRouter } = require("./user")
const { coinPlanRouter } = require("./coinPlan")
const {
  requestToCreatePlayerRouter,
} = require("../router/requestToCreatePlayer")
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
  app.use(
    `/api/${appVersion}/player-position`,
    isAuthenticate,
    isAdmin,
    playerPositionRouter
  )
  app.use(
    `/api/${appVersion}/primitive-player-power`,
    isAuthenticate,
    isAdmin,
    primitivePlayerPowerRouter
  )
  app.use(
    `/api/${appVersion}/team`,
    isAuthenticate,
    checkUserNotBlocked,
    teamRouter
  )
  app.use(
    `/api/${appVersion}/player`,
    isAuthenticate,
    checkUserNotBlocked,
    playerRouter
  )
  app.use(
    `/api/${appVersion}/request-to-create-player`,
    isAuthenticate,
    checkUserNotBlocked,
    requestToCreatePlayerRouter
  )
  app.use(`/api/${appVersion}/user`, isAuthenticate, userRouter)
  app.use(`/api/${appVersion}/coin-plan`, isAuthenticate, coinPlanRouter)
  //#endregion
  app.use("*", notFoundResponse)
  app.use(errorHandler)
}
