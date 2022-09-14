const appVersion = "v1"
const { errorHandler, notFoundResponse } = require("../helpers/responseHandler")
const { isAuthenticate } = require("../middleware/athentication")
const {
  hasAccessToAdminOperation,
  hasAccessToPlayWithApp,
} = require("../middleware/accessControl/index")
//#region import routers
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
const { gymRouter } = require("./gym")
const { coachRouter } = require("./coach")
const { doctorRouter } = require("./doctor")
const { psychologistRouter } = require("./psychologist")
const { energyProducerRouter } = require("./energyProducer")
const { stadiumRouter } = require("./stadium")
const {
  requestToCreatePlayerRouter,
} = require("../router/requestToCreatePlayer")
//#endregion
module.exports.registerRoutes = (app) => {
  //#region add routes
  app.use(`/api/${appVersion}/authentication`, authenticationRouter)
  app.use(
    `/api/${appVersion}/admin/reserved-team-name`,
    isAuthenticate,
    hasAccessToAdminOperation,
    reservedTeamNameRouter
  )
  app.use(
    `/api/${appVersion}/admin/player-face-picture`,
    isAuthenticate,
    hasAccessToAdminOperation,
    playerFacePictureRouter
  )
  app.use(
    `/api/${appVersion}/admin/composition`,
    isAuthenticate,
    hasAccessToAdminOperation,
    compositionRouter
  )
  app.use(
    `/api/${appVersion}/admin/primitive-player-name`,
    isAuthenticate,
    hasAccessToAdminOperation,
    primitivePlayerNameRouter
  )
  app.use(
    `/api/${appVersion}/admin/primitive-player-age`,
    isAuthenticate,
    hasAccessToAdminOperation,
    primitivePlayerAgeRouter
  )
  app.use(
    `/api/${appVersion}/admin/player-position`,
    isAuthenticate,
    hasAccessToAdminOperation,
    playerPositionRouter
  )
  app.use(
    `/api/${appVersion}/admin/primitive-player-power`,
    isAuthenticate,
    hasAccessToAdminOperation,
    primitivePlayerPowerRouter
  )
  app.use(
    `/api/${appVersion}/team`,
    isAuthenticate,
    hasAccessToPlayWithApp,
    teamRouter
  )
  app.use(
    `/api/${appVersion}/player`,
    isAuthenticate,
    hasAccessToPlayWithApp,
    playerRouter
  )
  app.use(
    `/api/${appVersion}/request-to-create-player`,
    isAuthenticate,
    hasAccessToPlayWithApp,
    requestToCreatePlayerRouter
  )
  app.use(`/api/${appVersion}/user`, isAuthenticate, userRouter)
  app.use(`/api/${appVersion}/coin-plan`, isAuthenticate, coinPlanRouter)
  app.use(`/api/${appVersion}/gym`, isAuthenticate, gymRouter)
  app.use(`/api/${appVersion}/coach`, isAuthenticate, coachRouter)
  app.use(`/api/${appVersion}/doctor`, isAuthenticate, doctorRouter)
  app.use(`/api/${appVersion}/doctor`, isAuthenticate, psychologistRouter)
  app.use(`/api/${appVersion}/stadium`, isAuthenticate, stadiumRouter)
  app.use(
    `/api/${appVersion}/energy-producer`,
    isAuthenticate,
    energyProducerRouter
  )
  //#endregion
  app.use("*", notFoundResponse)
  app.use(errorHandler)
}
