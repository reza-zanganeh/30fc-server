//#region require third party packages
const express = require("express")
const compression = require("compression")
const cors = require("cors")
//#endregion
//#region global app configuration
const projectConfig = require("../../config/index")
const { registerRoutes } = require("./router/index")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors(projectConfig.server.httpServer.cors))
registerRoutes(app)

//#endregion
//#region functions that run on running server
const { readGeneralDataAndSaveOnRedis } = require("./helpers/Functions")
const { internalServerErrorHandler } = require("./helpers/responseHandler")
const { resetGameCount } = require("./services/redis")

//#endregion
const PORT = projectConfig.server.httpServer.port
app.listen(PORT, async () => {
  try {
    console.log(`server is running on ${PORT}`)
    // console.log(
    //   `please define the following list items on database then use app
    //     1 . 4-4-2 composition
    //     2 . at least 105 primitive player name
    //     3 . at least 105 player face picture
    //     4 . positions
    //     5 . factors :
    //          SalaryFactor
    //          DifferenceInPointsForEachGoal
    //          MinimumPlayerPrice
    //          MaximumPlayerPrice
    //          InviteNewTeamCoinCount
    //    6 . studiom level 1
    //    7 . stadiumFacilitiesModelName
    //   `
    // )
    await readGeneralDataAndSaveOnRedis()
    await resetGameCount()
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
})
