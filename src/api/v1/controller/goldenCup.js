const {
  create,
  update,
  readOne,
  createPrismaQueryPool,
  addPrismaQueryToPool,
  updateWithoutExecute,
  prismaTransaction,
} = require("../helpers/prisma")
const { modelName } = require("../../../config/Constant")
const { goldenCupModelName, teamModelName } = modelName
const {
  resposeHandler,
  internalServerErrorHandler,
} = require("../helpers/responseHandler")
const { Ok, BadRequest } = require("../helpers/HttpResponse")
const { createError } = require("../helpers/Functions")
const {
  addTeamToGoldenCupPrismaQuery,
  getEndOfRegisterationGoldenCup,
  startGoldenCupPrismaQuery,
  addGoldenCupGamesPrismaQuery,
  getGoldenCupAndSortedChampionsGames,
  getGoldenCupsWithGamesThatPassedStartTime,
} = require("../prismaQuery/goldenCup")
const {
  planningEliminationCupGames,
  getGoldenCupGameTime,
} = require("../modelHelperFunction/eliminationCup")
const { deleteGoldenCupGames } = require("../prismaQuery/game")
const { playGame } = require("../modelHelperFunction/game")
const {
  updateFirstTeamAndSecondTeamInGoldenCupPrismaQuery,
} = require("../prismaQuery/team")
module.exports.createGoldenCupByAdmin = async (req, res, next) => {
  try {
    const {
      teamCount,
      registerCostInToman,
      registerationOpenForSilverTeam,
      registerationOpenForGoldenTeam,
      registerationOpenForDiamondTeam,
    } = req.body

    const goldenCup = await create(goldenCupModelName.english, {
      teamCount,
      registerCostInToman,
      silver: registerationOpenForSilverTeam,
      golden: registerationOpenForGoldenTeam,
      diamond: registerationOpenForDiamondTeam,
    })

    let copyOfTeamCount = teamCount
    while (copyOfTeamCount > 1) {
      copyOfTeamCount /= 2
      console.log(copyOfTeamCount)
    }
    if (copyOfTeamCount !== 1)
      return next(
        createError(BadRequest("تعداد تیم های شرکت کننده باید توانی از 2 باشد"))
      )

    resposeHandler(res, goldenCup, Ok("ساخت جام طلایی"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.startGoldenCupByAdmin = async (req, res, next) => {
  try {
    const { id: goldenCupId } = req.params
    await update(
      goldenCupModelName.english,
      { id: +goldenCupId },
      { status: "Registering" }
    )
    resposeHandler(res, {}, Ok("باز شدن ثبت نام جام طلایی"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.registerAtGoldenCup = async (req, res, next) => {
  try {
    const { goldenCupId } = req.body
    const goldenCup = await readOne(goldenCupModelName.english, {
      id: +goldenCupId,
    })
    const {
      id: teamId,
      coinCount,
      teamMembershipType,
    } = req[teamModelName.english]

    if (goldenCup.status === "NotStarted")
      return next(
        createError(BadRequest("ثبت نام در این جام هنوز شروع نشده است"))
      )

    if (goldenCup.status === "EndOfRegisteration")
      return next(
        createError(BadRequest("ثبت نام در این جام به پایان رسیده است"))
      )

    if (goldenCup.status === "Running")
      return next(
        createError(
          BadRequest(
            "این جام در حال اجرا است و ثبت نام در ان امکان پذیر نمی باشد"
          )
        )
      )

    if (goldenCup.status === "Ended")
      return next(
        createError(
          BadRequest(
            "این جام به پایان رسیده است و ثبت نام در ان امکان پذیر نمی باشد"
          )
        )
      )

    if (goldenCup.registeredTeamCount >= goldenCup.teamCount) {
      await update(
        goldenCupModelName.english,
        { id: +goldenCupId },
        { status: "EndOfRegisteration" }
      )
      return next(createError(BadRequest("ظرفیت جام به پایان رسیده است")))
    }
    // check coin count
    if (coinCount < goldenCup.registerCostInToman)
      return next(
        createError(
          BadRequest(
            "مقدار سکه شما برای شرکت در این جام کافی نمی باشد لطفا ابتدا سکه های خود را افزایش دهید و مجدد تلاش کنید"
          )
        )
      )
    // check team level
    if (
      (!goldenCup.silver || teamMembershipType !== "Silver") &&
      (!goldenCup.golden || teamMembershipType !== "Golden") &&
      (!goldenCup.diamond || teamMembershipType !== "Diamond")
    )
      return next(
        createError(
          BadRequest(
            `شما سطح عضویت لازم برای شرکت در این جام را ندارید سطح عضویت لازم برای این جام  `
          )
        )
      )

    const registerAtGoldenCupPrismaPoolIndex = createPrismaQueryPool()
    addPrismaQueryToPool(
      registerAtGoldenCupPrismaPoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: +teamId },
        { coinCount: coinCount - goldenCup.registerCostInToman }
      )
    )
    addPrismaQueryToPool(
      registerAtGoldenCupPrismaPoolIndex,
      addTeamToGoldenCupPrismaQuery(+goldenCupId, +teamId)
    )

    resposeHandler(res, {}, Ok("شرکت در جام طلایی"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.startEndOfRegistrationGoldenCup = async () => {
  try {
    const endRegistrationGoldenCup = await getEndOfRegisterationGoldenCup()
    const goldenCupCount = endRegistrationGoldenCup.length
    // check exists golden cup with EndOfRegisteration status
    if (goldenCupCount <= 0) return
    const startEndOfRegistrationGoldenCupPrismaPoolIndex =
      createPrismaQueryPool()
    const goldenCupGameTime = await getGoldenCupGameTime()
    for (
      let goldenCupIndex = 0;
      goldenCupIndex < goldenCupCount;
      goldenCupIndex++
    ) {
      // planing games
      // change status to running
      const games = planningEliminationCupGames(
        endRegistrationGoldenCup[goldenCupIndex].teams.map((team) => team.id),
        goldenCupGameTime,
        12,
        1
      )
      addPrismaQueryToPool(
        startEndOfRegistrationGoldenCupPrismaPoolIndex,
        startGoldenCupPrismaQuery(
          endRegistrationGoldenCup[goldenCupIndex].id,
          endRegistrationGoldenCup[goldenCupIndex].teams,
          games
        )
      )
    }
    prismaTransaction(startEndOfRegistrationGoldenCupPrismaPoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}

module.exports.playingRecivedStepGoldenCupGamesAndPlaningNextGame =
  async () => {
    try {
      // get passed time games
      const goldenCupsWithGamesThatPassedStartTime =
        await getGoldenCupsWithGamesThatPassedStartTime()
      const goldenCupsCount = goldenCupsWithGamesThatPassedStartTime.length
      // check if not return
      if (goldenCupsCount <= 0) return
      // some as champions cup
      const playingRecivedStepGoldenCupGamesAndPlaningNextGamePrismaPoolIndex =
        createPrismaQueryPool()
      const goldenCupGameTime = await getGoldenCupGameTime()

      for (
        let goldenCupIndex = 0;
        goldenCupIndex < goldenCupsCount;
        goldenCupIndex++
      ) {
        const { id: goldenCupId, games: goldenCupGames } =
          goldenCupsWithGamesThatPassedStartTime[goldenCupIndex]
        const goldenCupGameThatPassedStartTimeCount = goldenCupGames.length
        if (goldenCupGameThatPassedStartTimeCount <= 0) continue
        const winnerTeamIds = []
        for (let i = 0; i < goldenCupGameThatPassedStartTimeCount; i++) {
          const { winnerTeamId } = await playGame(
            goldenCupGames[i].hostTeamId,
            goldenCupGames[i].visitingTeamId,
            "goldenCup",
            goldenCupGames[i].id,
            playingRecivedStepGoldenCupGamesAndPlaningNextGamePrismaPoolIndex
          )
          winnerTeamIds.push(winnerTeamId)
        }
        if (winnerTeamIds.length === 1) {
          addPrismaQueryToPool(
            playingRecivedStepGoldenCupGamesAndPlaningNextGamePrismaPoolIndex,
            updateWithoutExecute(goldenCupModelName.english, {
              status: "Ended",
            })
          )
        }
        if (winnerTeamIds.length >= 2) {
          const nextStep = goldenCupGames[0].step + 1
          const newGoldenCupGames = planningEliminationCupGames(
            winnerTeamIds,
            goldenCupGameTime,
            24,
            nextStep
          )
          addPrismaQueryToPool(
            playingRecivedStepGoldenCupGamesAndPlaningNextGamePrismaPoolIndex,
            addGoldenCupGamesPrismaQuery(newGoldenCupGames, goldenCupId)
          )
        }
      }
      prismaTransaction(
        playingRecivedStepGoldenCupGamesAndPlaningNextGamePrismaPoolIndex
      )
    } catch (error) {
      internalServerErrorHandler(null, error)
    }
  }

module.exports.endComplateGoldenCup = async () => {
  // gifts
  // specify first and second team
  // delete not usefull data scorer player games
  try {
    const endComplateGoldenCupPoolIndex = createPrismaQueryPool()
    const goldenCupsGamesWithSortedGames =
      await getGoldenCupAndSortedChampionsGames()
    const goldenCupCount = goldenCupsGamesWithSortedGames.length
    if (goldenCupCount <= 0) return
    for (
      let goldenCupIndex = 0;
      goldenCupIndex < goldenCupCount;
      goldenCupIndex++
    ) {
      const { id: goldenCupId, games: goldenCupGames } =
        goldenCupsGamesWithSortedGames[goldenCupIndex]
      let firstTeamInGoldenCupId, secondTeamInGoldenCupId
      const lastGoldenCupGame = goldenCupGames[goldenCupGames.length - 1]
      if (lastGoldenCupGame.result === "hostTeam") {
        firstTeamInGoldenCupId = lastGoldenCupGame.hostTeamId
        secondTeamInGoldenCupId = lastGoldenCupGame.visitingTeamId
      } else {
        firstTeamInGoldenCupId = lastGoldenCupGame.visitingTeamId
        secondTeamInGoldenCupId = lastGoldenCupGame.hostTeamId
      }
      await updateFirstTeamAndSecondTeamInGoldenCupPrismaQuery(
        firstTeamInGoldenCupId,
        secondTeamInGoldenCupId,
        endComplateGoldenCupPoolIndex
      )
      addPrismaQueryToPool(
        endComplateGoldenCupPoolIndex,
        updateWithoutExecute(
          goldenCupModelName.english,
          { id: goldenCupId },
          {
            firstTeamId: firstTeamInGoldenCupId,
            secondTeamId: secondTeamInGoldenCupId,
          }
        )
      )
    }

    deleteGoldenCupGames(endComplateGoldenCupPoolIndex)
    prismaTransaction(endComplateGoldenCupPoolIndex)
  } catch (error) {
    internalServerErrorHandler(null, error)
  }
}
