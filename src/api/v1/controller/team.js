const { createError } = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  BadRequest,
  Created,
  Ok,
} = require("../helpers/HttpResponse")
const { readOne, readAll } = require("../helpers/prisma")
const {
  validateTeamName,
  createDataTeam,
  getPositionsMap,
} = require("../modelHelperFunction/team")
const {
  getPlayersPrismaQuery,
  createTeamPrismaQuery,
  changeCompositionPrismaQuery,
  changeTwoPlayerPositionPrismaQuery,
} = require("../prismaQuery/team")
const { modelName } = require("../../../config/Constant")
const { compositionModelName, userModelName, playerModelName } = modelName
module.exports.createTeam = async (req, res, next) => {
  try {
    const { teamName } = req.body
    const ownerId = req.user.id

    const user = await readOne(
      userModelName.english,
      { id: +ownerId },
      { id: true, teamCount: true }
    )

    if (+user.teamCount > 2 && !user.isPayedForCreatingThirdTeam)
      return next(
        createError(
          BadRequest(
            "کاربر گرامی شما حداکثر می توانید 2 تیم به صورت ریگان بسازید برای ساخت تیم سوم می توانید از قسمت پرداخت هزینه برای ساخت تیم سوم اقدام کنید"
          )
        )
      )

    if (+user.teamCount > 3)
      return next(
        createError(
          BadRequest("کاربر گرامی شما حداکثر می توانید 3 تیم داشته باشید")
        )
      )

    const {
      isValid: isValidTeamName,
      errorMessage: invalidTeamNameErrorMessage,
    } = await validateTeamName(teamName)

    if (!isValidTeamName)
      return next(createError(BadRequest(invalidTeamNameErrorMessage)))

    const {
      players,
      compositionId,
      strategy,
      technique,
      defaultStadiumFacilitiesId,
      defaultStadiumId,
    } = await createDataTeam(teamName)

    const createdTeam = await createTeamPrismaQuery(
      teamName,
      +ownerId,
      +compositionId,
      strategy,
      technique,
      defaultStadiumId,
      defaultStadiumFacilitiesId,
      players
    )

    resposeHandler(res, createdTeam, Created("تیم"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.getPlayers = async (req, res, next) => {
  try {
    const { id: teamId } = req.params

    const players = await getPlayersPrismaQuery(+teamId)

    resposeHandler(res, players, Ok({ operationName: "خواندن بازیکنان تیم" }))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.changeComposition = async (req, res, next) => {
  try {
    const { compositionId } = req.body
    const { id: teamId } = req.team
    const newComposition = req[compositionModelName.english]
    delete newComposition.id
    const players = await readAll(
      playerModelName.english,
      { teamId: +teamId, inMainComposition: true },
      {
        id: true,
        positionInMainComposition: true,
      }
    )

    const positionInMainCompositionToIdPlayerMap = {}

    players.forEach((player) => {
      positionInMainCompositionToIdPlayerMap[
        `${player.positionInMainComposition.major}_${player.positionInMainComposition.manor}`
      ] = player.id
    })

    const updatedPlayer = []

    // positionId
    const positionsMap = await getPositionsMap()

    for (const [position, havePlayer] of Object.entries(newComposition)) {
      if (havePlayer) {
        if (positionInMainCompositionToIdPlayerMap[position]) {
          delete positionInMainCompositionToIdPlayerMap[position]
        } else {
          const major = position.split("_")[0]
          let playerId
          if (positionInMainCompositionToIdPlayerMap[`${major}_Left`]) {
            playerId = positionInMainCompositionToIdPlayerMap[`${major}_Left`]
            delete positionInMainCompositionToIdPlayerMap[`${major}_Left`]
          } else if (positionInMainCompositionToIdPlayerMap[`${major}_One`]) {
            playerId = positionInMainCompositionToIdPlayerMap[`${major}_One`]
            delete positionInMainCompositionToIdPlayerMap[`${major}_One`]
          } else if (positionInMainCompositionToIdPlayerMap[`${major}_Two`]) {
            playerId = positionInMainCompositionToIdPlayerMap[`${major}_Two`]
            delete positionInMainCompositionToIdPlayerMap[`${major}_Two`]
          } else if (positionInMainCompositionToIdPlayerMap[`${major}_Three`]) {
            playerId = positionInMainCompositionToIdPlayerMap[`${major}_Three`]
            delete positionInMainCompositionToIdPlayerMap[`${major}_Three`]
          } else if (positionInMainCompositionToIdPlayerMap[`${major}_Right`]) {
            playerId = positionInMainCompositionToIdPlayerMap[`${major}_Right`]
            delete positionInMainCompositionToIdPlayerMap[`${major}_Right`]
          }

          if (playerId) {
            updatedPlayer.push({
              id: +playerId,
              positionInMainCompositionId: positionsMap[position],
            })
          } else {
            updatedPlayer.push({
              id: +Object.values(positionInMainCompositionToIdPlayerMap)[0],
              positionInMainCompositionId: positionsMap[position],
            })
          }
        }
      }
    }

    const updatedTeam = await changeCompositionPrismaQuery(
      +teamId,
      +compositionId,
      updatedPlayer
    )

    resposeHandler(res, updatedTeam, Ok({ operationName: "تغییر ترکیب" }))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

module.exports.changeTwoPlayerPosition = async (req, res, next) => {
  try {
    const { playerOneId, playerTwoId } = req.body
    const { id: teamId } = req.team

    const playerOne = await readOne(
      playerModelName.english,
      {
        id: +playerOneId,
        teamId: +teamId,
      },
      { positionInMainCompositionId: true, name: true, status: true, id: true }
    )

    const playerTwo = await readOne(
      playerModelName.english,
      {
        id: +playerTwoId,
        teamId: +teamId,
      },
      { positionInMainCompositionId: true, name: true, status: true, id: true }
    )

    if (!playerOne || !playerTwo)
      return next(createError(BadRequest("بازیکنان متعلق به تیم شما نیستند")))

    if (playerOne.status === "InMarket" || playerTwo.status === "InMarket")
      return next(
        createError(
          BadRequest(
            "شما قادر به تعویض بازیکنانی که برای فروش گذاشته اید نمی باشید"
          )
        )
      )

    const result = await changeTwoPlayerPositionPrismaQuery(
      +teamId,
      playerOne,
      playerTwo
    )

    resposeHandler(
      res,
      result,
      Ok({ operationName: `تعویض ${playerOne.name} با ${playerTwo.name}` })
    )
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
