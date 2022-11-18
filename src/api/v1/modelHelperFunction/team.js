const { modelName } = require("../../../config/Constant")
const {
  createRandomNumber,
  howManyDayPssedFromNow,
} = require("../helpers/Functions")
const {
  compositionModelName,
  primitivePlayerNameModelName,
  playerFacePictureModelName,
  playerPositionModelName,
  reservedTeamNameModelName,
  teamModelName,
  stadiumFacilitiesModelName,
  stadiumModelName,
} = modelName
const {
  readOne,
  readAll,
  updateWithoutExecute,
  addPrismaQueryToPool,
} = require("../helpers/prisma")
const { calculatePlayerSalary } = require("../helpers/formula")
const {
  blockTeamsPrismaQuery,
  getComplateInfoAboutSponserAndScoresTopThreeTeams,
} = require("../prismaQuery/team")
// data functions
const getPositionsMap = async () => {
  try {
    const positions = await readAll(playerPositionModelName.english)
    const positionsMap = {}
    positions.forEach((position) => {
      positionsMap[`${position.major}_${position.manor}`] = position.id
    })
    return positionsMap
  } catch (error) {
    throw error
  }
}

const createDataTeam = async (teamName) => {
  try {
    const composition = await readOne(compositionModelName.english, {
      name: "4-4-2",
    })
    const compositionId = composition.id
    delete composition.id
    delete composition.name

    const defaultStadiumId = (
      await readOne(stadiumModelName.english, { level: "1" })
    ).id
    const defaultStadiumFacilitiesId = (
      await readOne(stadiumFacilitiesModelName.english, { level: "1" })
    ).id
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
      primitivePlayerNameCount / 21
    )
    let primitivePlayerNameSelectRangeStart = 1

    // face picture
    const playerFacePicture = await readAll(
      playerFacePictureModelName.english,
      {
        isSpecial: false,
      },
      { id: true }
    )
    const playerFacePictureCount = playerFacePicture.length
    const playerFacePictureSelectRange = Math.floor(playerFacePictureCount / 21)
    let playerFacePictureSelectRangeStart = 1

    const positionsMap = await getPositionsMap()

    const playerPositionsOnTeam = [
      "Goalkeaper_No",
      "Goalkeaper_No",
      "Defender_Left",
      "Defender_Left",
      "Defender_Middle",
      "Defender_Middle",
      "Defender_Middle",
      "Defender_Right",
      "Defender_Right",
      "Midfielder_Left",
      "Midfielder_Left",
      "Midfielder_Middle",
      "Midfielder_Middle",
      "Midfielder_Right",
      "Midfielder_Right",
      "Attacker_Left",
      "Attacker_Left",
      "Attacker_Middle",
      "Attacker_Middle",
      "Attacker_Right",
      "Attacker_Right",
    ]

    const PositionOnCompositionToPlayerMap = {
      Goalkeaper_No: createRandomNumber(0, 1),
      Defender_Left: createRandomNumber(2, 3),
      Defender_One: createRandomNumber(4, 5),
      Defender_Three: 6,
      Defender_Right: createRandomNumber(7, 8),
      Midfielder_Left: createRandomNumber(9, 10),
      Midfielder_One: 11,
      Midfielder_Three: 12,
      Midfielder_Right: createRandomNumber(13, 14),
      Attacker_One: 17,
      Attacker_Three: 18,
    }
    // age
    const ages = [
      20, 25, 20, 22, 21, 20, 23, 26, 24, 26, 25, 24, 25, 26, 22, 21, 20, 26,
      23, 21, 23,
    ]
    let agesArrayLenght = 21
    // power
    const powers = [
      250, 270, 280, 270, 250, 280, 270, 290, 260, 280, 290, 270, 260, 250, 280,
      250, 260, 300, 250, 290, 270,
    ]
    let powersArrayLenght = 21

    const players = []

    for (let counter = 1; counter <= 21; ++counter) {
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

      const age = ages[createRandomNumber(0, agesArrayLenght)]
      agesArrayLenght--

      const facePictureId =
        playerFacePicture[
          createRandomNumber(
            playerFacePictureSelectRangeStart,
            playerFacePictureSelectRangeStart + playerFacePictureSelectRange - 1
          ) - 1
        ].id
      playerFacePictureSelectRangeStart += playerFacePictureSelectRange

      const totalPower = powers[createRandomNumber(0, powersArrayLenght)]
      powersArrayLenght--

      const salary = await calculatePlayerSalary(totalPower, age)

      const position = playerPositionsOnTeam[counter - 1]
      const positionId = positionsMap[position]
      const tShirtNumber = counter

      const power = totalPower / 10

      players[counter - 1] = {
        name,
        age,
        facePictureId,
        spead: power,
        controll: power,
        pass: power,
        flexibility: power,
        stamina: power,
        technique: power,
        shoot: power,
        drible: power,
        focus: power,
        experience: power,
        totalPower,
        salary,
        positionId,
        tShirtNumber,
      }
    }

    for (const [position, havePlayer] of Object.entries(composition)) {
      if (havePlayer) {
        players[
          PositionOnCompositionToPlayerMap[position]
        ].inTeamMainComposition = true
        players[
          PositionOnCompositionToPlayerMap[position]
        ].positionInMainCompositionId = positionsMap[position]
      }
    }

    return {
      defaultStadiumFacilitiesId,
      defaultStadiumId,
      compositionId,
      strategy: "Press",
      technique: "Moderate",
      players,
    }
  } catch (error) {
    throw error
  }
}

const validateTeamName = async (teamName) => {
  try {
    const selectedNameIsReserved =
      (await readOne(
        reservedTeamNameModelName.english,
        {
          name: teamName,
        },
        { id: true }
      )) !== null

    if (selectedNameIsReserved)
      return {
        isValid: false,
        errorMessage:
          "نام تیم انتخابی شما جزو اسامی ویژه می باشد لطفا نام دیگری انتخاب کنید",
      }

    const selectedTeamNameIsInUse =
      (await readOne(
        teamModelName.english,
        {
          name: teamName,
        },
        { id: true }
      )) !== null

    if (selectedTeamNameIsInUse)
      return {
        isValid: false,
        errorMessage:
          "نام تیم انتخابی شما قبلا استفاده شده است نام تیم شما باید متفاوت باشد",
      }

    return {
      isValid: true,
    }
  } catch (error) {
    throw error
  }
}

const updateThreeTopLeagueTeams = async (
  firstTeamId,
  secondTeamId,
  thirdTeamId,
  prismaQueriesEndLeaguePoolIndex
) => {
  try {
    const threeTopTeams =
      await getComplateInfoAboutSponserAndScoresTopThreeTeams(
        firstTeamId,
        secondTeamId,
        thirdTeamId
      )
    addPrismaQueryToPool(
      prismaQueriesEndLeaguePoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: threeTopTeams[0].id },
        {
          ...(threeTopTeams[0].sponser && {
            coinCount:
              threeTopTeams[0].coinCount +
              threeTopTeams[0].sponser.firstInLeagueCoinCount,
          }),
          teamScores: {
            update: {
              firstTeamInLeagueCupCount:
                threeTopTeams[0].teamScores.firstTeamInLeagueCupCount + 1,
              ...(threeTopTeams[0].tournament && {
                scoreInTournament:
                  threeTopTeams[0].tournament.firstTeamInLeaguePoints +
                  threeTopTeams[0].teamScores.scoreInTournament,
              }),
              totalScore: threeTopTeams[0].teamScores.totalScore + 30,
            },
          },
        }
      )
    )
    addPrismaQueryToPool(
      prismaQueriesEndLeaguePoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: threeTopTeams[1].id },
        {
          ...(threeTopTeams[1].sponser && {
            coinCount:
              threeTopTeams[1].coinCount +
              threeTopTeams[1].sponser.secondInLeagueCoinCount,
          }),
          teamScores: {
            update: {
              secondTeamInLeagueCupCount:
                threeTopTeams[1].teamScores.secondTeamInLeagueCupCount + 1,
              ...(threeTopTeams[1].tournament && {
                scoreInTournament:
                  threeTopTeams[1].tournament.secondTeamInLeagePoints +
                  threeTopTeams[1].teamScores.scoreInTournament,
              }),
              totalScore: threeTopTeams[1].teamScores.totalScore + 20,
            },
          },
        }
      )
    )
    addPrismaQueryToPool(
      prismaQueriesEndLeaguePoolIndex,
      updateWithoutExecute(
        teamModelName.english,
        { id: threeTopTeams[2].id },
        {
          ...(threeTopTeams[2].sponser && {
            coinCount:
              threeTopTeams[2].coinCount +
              threeTopTeams[2].sponser.thirdInLeagueCoinCount,
          }),
          teamScores: {
            update: {
              thirdTeamInLeagueCupCount:
                threeTopTeams[2].teamScores.thirdTeamInLeagueCupCount + 1,
              ...(threeTopTeams[2].tournament && {
                scoreInTournament:
                  threeTopTeams[2].tournament.thirdTeamInLeaguePoints +
                  threeTopTeams[2].teamScores.scoreInTournament,
              }),
              totalScore: threeTopTeams[2].teamScores.totalScore + 10,
            },
          },
        }
      )
    )
  } catch (error) {
    throw error
  }
}

const blockInactiveTeams = async () => {
  try {
    const teams = await readAll(teamModelName.english, {
      isBlock: { equals: false },
    })
    const inactiveTeamIds = []
    teams.forEach((team) => {
      if (howManyDayPssedFromNow(team.lastTimeSeen) >= 30)
        inactiveTeamIds.push(team.id)
    })
    if (inactiveTeamIds.length > 0) await blockTeamsPrismaQuery(inactiveTeamIds)
  } catch (error) {
    throw error
  }
}

module.exports = {
  createDataTeam,
  validateTeamName,
  getPositionsMap,
  updateThreeTopLeagueTeams,
  blockInactiveTeams,
}
