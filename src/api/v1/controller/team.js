const {
  createError,
  createRandomNumber,
  sumOfArrayElements,
} = require("../helpers/Functions")
const { resposeHandler } = require("../helpers/responseHandler")
const {
  InternalServerError,
  BadRequest,
  Created,
  Ok,
} = require("../helpers/HttpResponse")
const { readOne, count, getNthRecord, readAll } = require("../helpers/prisma")
const { createTeam, getPlayers } = require("../dataLogic/team")
const { modelName } = require("../../../config/Constant")
const {
  compositionModelName,
  reservedTeamNameModelName,
  primitivePlayerNameModelName,
  primitivePlayerAgeModelName,
  primitivePlayerPowerModelName,
  playerFacePictureModelName,
  userModelName,
  playerPositionModelName,
} = modelName
module.exports.createTeam = async (req, res, next) => {
  try {
    const { name, compositionId, technique, strategy } = req.body
    const ownerId = req.user.id

    const user = await readOne(
      userModelName.english,
      { id: +ownerId },
      { id: true, teamCount: true }
    )

    if (+user.teamCount >= 3)
      return next(
        createError(
          BadRequest("کاربر گرامی شما حداکثر می توانید 3 تیم داشته باشید")
        )
      )
    const selectedNameIsReserved =
      (await readOne(
        reservedTeamNameModelName.english,
        {
          name,
        },
        { id: true }
      )) !== null

    if (selectedNameIsReserved)
      return next(
        createError(
          BadRequest(
            "اسم تیم انتخابی شما جزو اسامی ویژه است . شما می توانید در اینده نزدیک این اسم را از مارکت خریداری کنید"
          )
        )
      )

    const composition = await readOne(compositionModelName.english, {
      id: +compositionId,
    })

    const isExistsSelectedComposition = composition !== null

    if (!isExistsSelectedComposition)
      return next(
        createError(
          BadRequest(
            "ترکیب انتخابی شما معتبر نمی باشد لطفا یک ترکیب معتبر انتخاب کنید"
          )
        )
      )

    delete composition.id
    delete composition.score

    // create 20 random player
    // name
    const primitivePlayerName = await readAll(
      primitivePlayerNameModelName.english,
      null,
      {
        name: true,
      }
    )
    const primitivePlayerNameCount = primitivePlayerName.length
    const primitivePlayerNameSelectRange = Math.floor(
      primitivePlayerNameCount / 20
    )
    let primitivePlayerNameSelectRangeStart = 1

    // age
    const primitivePlayerAgeCount = await count(
      primitivePlayerAgeModelName.english
    )
    const randomPrimitivePlayerAge = createRandomNumber(
      1,
      primitivePlayerAgeCount - 1
    )
    const ages = await getNthRecord(
      primitivePlayerAgeModelName.english,
      randomPrimitivePlayerAge
    )
    delete ages.id
    const arrayFromAges = Object.values(ages)

    // face picture
    const playerFacePicture = await readAll(
      playerFacePictureModelName.english,
      {
        isSpecial: false,
      },
      { id: true }
    )
    const playerFacePictureCount = playerFacePicture.length
    const playerFacePictureSelectRange = Math.floor(playerFacePictureCount / 20)
    let playerFacePictureSelectRangeStart = 1

    // PrimitivePlayerPower
    const primitivePlayerPower = await readAll(
      primitivePlayerPowerModelName.english,
      null,
      {
        spead: true,
        controll: true,
        pass: true,
        flexibility: true,
        stamina: true,
        technique: true,
        shoot: true,
        drible: true,
        focus: true,
        experience: true,
      }
    )
    const primitivePlayerPowerCount = primitivePlayerPower.length
    const primitivePlayerPowerSelectRange = Math.floor(
      primitivePlayerPowerCount / 20
    )
    let primitivePlayerPowerSelectRangeStart = 1

    // positionId
    const positions = await readAll(playerPositionModelName.english)
    const positionsMap = {}
    positions.forEach((position) => {
      positionsMap[`${position.major}_${position.manor}`] = position.id
    })

    const playerPositionsOnTeam = [
      "GOALKEAPER_NO",
      "GOALKEAPER_NO",
      "DEFENDER_LEFT",
      "DEFENDER_LEFT",
      "DEFENDER_MIDDLE",
      "DEFENDER_MIDDLE",
      "DEFENDER_MIDDLE",
      "DEFENDER_RIGHT",
      "DEFENDER_RIGHT",
      "MIDFIELDER_LEFT",
      "MIDFIELDER_LEFT",
      "MIDFIELDER_MIDDLE",
      "MIDFIELDER_MIDDLE",
      "MIDFIELDER_RIGHT",
      "MIDFIELDER_RIGHT",
      "ATTACKER_LEFT",
      "ATTACKER_LEFT",
      "ATTACKER_MIDDLE",
      "ATTACKER_RIGHT",
      "ATTACKER_RIGHT",
    ]

    const PositionOnCompositionToPlayerMap = {
      GOALKEAPER_NO: createRandomNumber(0, 1),
      DEFENDER_LEFT: createRandomNumber(2, 3),
      DEFENDER_ONE: 4,
      DEFENDER_TWO: 5,
      DEFENDER_THREE: 6,
      DEFENDER_RIGHT: createRandomNumber(7, 8),
      MIDFIELDER_LEFT: createRandomNumber(9, 10),
      MIDFIELDER_ONE: 11,
      MIDFIELDER_TWO: 12,
      MIDFIELDER_THREE: 13,
      MIDFIELDER_RIGHT: 14,
      ATTACKER_LEFT: 15,
      ATTACKER_ONE: 16,
      ATTACKER_TWO: 17,
      ATTACKER_THREE: 18,
      ATTACKER_RIGHT: 19,
    }

    const players = []

    for (let counter = 1; counter <= 20; ++counter) {
      // name
      const name =
        primitivePlayerName[
          createRandomNumber(
            primitivePlayerNameSelectRangeStart,
            primitivePlayerNameSelectRangeStart +
              primitivePlayerNameSelectRange -
              1
          ) - 1
        ].name
      primitivePlayerNameSelectRangeStart += primitivePlayerNameSelectRange
      // age
      const age = arrayFromAges[counter - 1]
      // face picture
      const facePictureId =
        playerFacePicture[
          createRandomNumber(
            playerFacePictureSelectRangeStart,
            playerFacePictureSelectRangeStart + playerFacePictureSelectRange - 1
          ) - 1
        ].id
      playerFacePictureSelectRangeStart += playerFacePictureSelectRange

      // power
      const power =
        primitivePlayerPower[
          createRandomNumber(
            primitivePlayerPowerSelectRangeStart,
            primitivePlayerPowerSelectRangeStart +
              primitivePlayerPowerSelectRange -
              1
          ) - 1
        ]
      primitivePlayerPowerSelectRangeStart += primitivePlayerPowerSelectRange

      const salary = 100

      const position = playerPositionsOnTeam[counter - 1]
      const positionId = positionsMap[position]
      players[counter - 1] = {
        name,
        age,
        facePictureId,
        ...power,
        totalPower: sumOfArrayElements(Object.values(power)),
        salary,
        positionId,
      }
    }

    for (const [position, havePlayer] of Object.entries(composition)) {
      if (havePlayer) {
        players[
          PositionOnCompositionToPlayerMap[position]
        ].inMainComposition = true
        players[
          PositionOnCompositionToPlayerMap[position]
        ].positionInMainCompositionId = positionsMap[position]
      }
    }

    const createdTeam = await createTeam(
      name,
      ownerId,
      compositionId,
      strategy,
      technique,
      players
    )

    resposeHandler(res, createdTeam, Created("تیم"))
  } catch (error) {
    if (error.code === "P2002" && error.meta.target[0] === "name")
      return next(
        createError(
          BadRequest(
            "نام تیم انتخابی شما تکراری است لطفا یک نام دیگر انتخاب کنید"
          )
        )
      )
    next(createError(InternalServerError()))
  }
}

module.exports.getPlayers = async (req, res, next) => {
  try {
    const { id } = req.params

    const players = await getPlayers(+id)

    resposeHandler(res, players, Ok("خواندن بازیکنان تیم"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
