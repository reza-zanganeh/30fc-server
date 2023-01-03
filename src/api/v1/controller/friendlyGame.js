const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
const { modelName } = require("../../../config/Constant")
const { createError } = require("../helpers/Functions")
const { BadRequest, Ok } = require("../helpers/HttpResponse")
const {
  readOne,
  createPrismaQueryPool,
  prismaTransaction,
  update,
  readAll,
  addPrismaQueryToPool,
  removeAllWithoutExecution,
} = require("../helpers/prisma")
const {
  createFriendlyGameRequestQuery,
  removeAditionalFriendlyGameData,
} = require("../modelHelperFunction/friendlyGame")
const { teamModelName, requestFriendlyGameModelName } = modelName
const { planningFriendlyGame } = require("../modelHelperFunction/friendlyGame")
const {
  addFriendlyGamesPrismaQuery,
  getFriendlyGamesThatPassedStartTime,
} = require("../prismaQuery/friendlyGame")
const { playGame } = require("../modelHelperFunction/game")
module.exports.requestFriendlyGame = async (req, res, next) => {
  try {
    const {
      id: senderTeamId,
      friendlyGameCount: senderTeamFriendlyGameCount,
      friendlyGameTimeOneIsEmpty: friendlyGameTimeOneIsEmptyForSenderTeam,
      friendlyGameTimeTwoIsEmpty: friendlyGameTimeTwoIsEmptyForSenderTeam,
      friendlyGameTimeThreeIsEmpty: friendlyGameTimeThreeIsEmptyForSenderTeam,
    } = req[teamModelName.english]
    const { receiverTeamId } = req.body

    if (senderTeamFriendlyGameCount >= 3)
      return next(
        createError(
          BadRequest("شما فقط می توانید 3 درخواست برای بازی دوستانه بدهید")
        )
      )

    // check reciever team exist
    const receiverTeam = await readOne(teamModelName.english, {
      id: +receiverTeamId,
    })
    if (!receiverTeam) return next(createError(BadRequest("تیم حریف یافت نشد")))

    const isRegisteredRequestBefore =
      (await readOne(requestFriendlyGameModelName.english, {
        senderTeamId: +senderTeamId,
        receiverTeamId: +receiverTeamId,
      })) !== null

    if (isRegisteredRequestBefore)
      return next(createError(BadRequest("این خواست قبلا ثبت شده است")))

    const {
      friendlyGameTimeOneIsEmpty: friendlyGameTimeOneIsEmptyForReceiverTeam,
      friendlyGameTimeTwoIsEmpty: friendlyGameTimeTwoIsEmptyForReceiverTeam,
      friendlyGameTimeThreeIsEmpty: friendlyGameTimeThreeIsEmptyForReceiverTeam,
      friendlyGameCount: receiverTeamFriendlyGameCount,
    } = receiverTeam
    // check both team have time
    const requestFriendlyGamePrismaQueryPoolIndex = createPrismaQueryPool()
    if (
      friendlyGameTimeOneIsEmptyForSenderTeam &&
      friendlyGameTimeOneIsEmptyForReceiverTeam
    ) {
      createFriendlyGameRequestQuery(
        { id: +senderTeamId, friendlyGameCount: senderTeamFriendlyGameCount },
        {
          id: +receiverTeamId,
          friendlyGameCount: receiverTeamFriendlyGameCount,
        },
        "One",
        requestFriendlyGamePrismaQueryPoolIndex
      )
    } else if (
      friendlyGameTimeTwoIsEmptyForSenderTeam &&
      friendlyGameTimeTwoIsEmptyForReceiverTeam
    ) {
      createFriendlyGameRequestQuery(
        { id: +senderTeamId, friendlyGameCount: senderTeamFriendlyGameCount },
        {
          id: +receiverTeamId,
          friendlyGameCount: receiverTeamFriendlyGameCount,
        },
        "Two",
        requestFriendlyGamePrismaQueryPoolIndex
      )
    } else if (
      friendlyGameTimeThreeIsEmptyForSenderTeam &&
      friendlyGameTimeThreeIsEmptyForReceiverTeam
    ) {
      createFriendlyGameRequestQuery(
        { id: +senderTeamId, friendlyGameCount: senderTeamFriendlyGameCount },
        {
          id: +receiverTeamId,
          friendlyGameCount: receiverTeamFriendlyGameCount,
        },
        "Three",
        requestFriendlyGamePrismaQueryPoolIndex
      )
    } else {
      return next(
        createError(
          BadRequest("تیم حریف زمان خالی برای بازی دوستانه با تیم شما را ندارد")
        )
      )
    }
    const [request] = await prismaTransaction(
      requestFriendlyGamePrismaQueryPoolIndex
    )

    resposeHandler(
      res,
      request,
      Ok({
        message:
          "درخواست شما با موفق ثبت شد نتیجه درخواست را در قسمت درخواست های من میتوانید ببینید",
      })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.acceptFriendlyGameRequest = async (req, res, next) => {
  try {
    const { requestId } = req.body

    const { id: teamId } = req[teamModelName.english]

    const request = req[requestFriendlyGameModelName.english]

    if (request.receiverTeamId !== teamId)
      return next(
        createError(BadRequest("این درخواست برای شما ارسال نشده است"))
      )

    if (request.status !== "Pending")
      return next(createError(BadRequest("این درخواست قبلا پاسخ داده شده است")))

    await update(
      requestFriendlyGameModelName.english,
      { id: +requestId },
      { status: "Confirm" }
    )

    resposeHandler(res, {}, Ok({ operationName: "تایید درخواست بازی دوستانه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.rejectFriendlyGameRequest = async (req, res, next) => {
  try {
    const { requestId } = req.body

    const { id: teamId } = req[teamModelName.english]

    const request = req[requestFriendlyGameModelName.english]

    if (request.receiverTeamId !== teamId)
      return next(
        createError(BadRequest("این درخواست برای شما ارسال نشده است"))
      )

    if (request.status !== "Pending")
      return next(createError(BadRequest("این درخواست قبلا پاسخ داده شده است")))

    await update(
      requestFriendlyGameModelName.english,
      { id: +requestId },
      { status: "Reject" }
    )

    resposeHandler(res, {}, Ok({ operationName: "رد درخواست بازی دوستانه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.getMyFriendlyRequestGame = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]

    const sendedRequest = await readAll(requestFriendlyGameModelName.english, {
      senderTeamId: +teamId,
    })
    const recivedRequest = await readAll(requestFriendlyGameModelName.english, {
      receiverTeamId: +teamId,
    })

    resposeHandler(
      res,
      { sendedRequest, recivedRequest },
      Ok("خواندن درخواست های بازی دوستانه")
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.disallowRequstFriendlyGame = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]
    await update(
      teamModelName.english,
      { id: +teamId },
      { friendlyGameRequestIsOn: false }
    )
    resposeHandler(res, {}, Ok("مسدود کردن دریافت بازی دوستانه "))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.allowRequestFriendlyGame = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]
    await update(
      teamModelName.english,
      { id: +teamId },
      { friendlyGameRequestIsOn: true }
    )
    resposeHandler(res, {}, Ok("اجازه دادن دریافت بازی دوستانه"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// call this function every 24 hourse
module.exports.planningFriendlyGame = async () => {
  try {
    // get accepted request
    const requestFriendlyGame = await readAll(
      requestFriendlyGameModelName.english,
      {
        status: "Confirm",
      }
    )
    if (!requestFriendlyGame) return
    const games = await planningFriendlyGame(requestFriendlyGame)
    // remove req and games scorer player
    const planningFriendlyGamePrismaPoolIndex = createPrismaQueryPool()
    removeAditionalFriendlyGameData(planningFriendlyGamePrismaPoolIndex)
    addPrismaQueryToPool(
      planningFriendlyGamePrismaPoolIndex,
      addFriendlyGamesPrismaQuery(games)
    )
    await prismaTransaction(planningFriendlyGamePrismaPoolIndex)
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// call in three friendly game time
module.exports.playRecievedTimeFriendlyGames = async () => {
  try {
    const playRecievedTimeFriendlyGamesPoolIndex = createPrismaQueryPool()
    const friendlyGameThatPassedStartTime =
      await getFriendlyGamesThatPassedStartTime()
    const friendlyGameThatPassedStartTimeCount =
      friendlyGameThatPassedStartTime.length
    for (let i = 0; i < friendlyGameThatPassedStartTimeCount; i++) {
      await playGame(
        friendlyGameThatPassedStartTime[i].hostTeamId,
        friendlyGameThatPassedStartTime[i].visitingTeamId,
        "friendly",
        friendlyGameThatPassedStartTime[i].id,
        playRecievedTimeFriendlyGamesPoolIndex
      )
    }
    prismaTransaction(playRecievedTimeFriendlyGamesPoolIndex)
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
