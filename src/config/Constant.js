const paginationTakeItemsCount = {
  reservedTeamName: 40,
  playerFacePicture: 10,
  composition: 10,
  primitivePlayerName: 40,
  primitivePlayerAge: 10,
  playerPosition: 20,
  primitivePlayerPower: 20,
  coinPlan: 20,
  gym: 10,
}

const gameSettings = {
  AverageAgeOfPlayers: 23,
  minimumPrimitiveAgeOfPalyer: 20,
  maximumPrimitiveAgeOfPalyer: 26,
  minimumPalyerCount: 15,
  maximumPalyerCount: 25,
}

const modelName = {
  compositionModelName: {
    english: "composition",
    persian: "ترکیب",
  },
  playerFacePictureModelName: {
    english: "playerFacePicture",
    persian: "تصویر بازیکن",
  },
  primitivePlayerAgeModelName: {
    english: "primitivePlayerAge",
    persian: "سن اولیه بازیکنان",
  },
  primitivePlayerNameModelName: {
    english: "primitivePlayerName",
    persian: "نام اولیه بازیکن",
  },
  primitivePlayerPowerModelName: {
    english: "primitivePlayerPower",
    persian: "قدرت اولیه بازیکن",
  },
  playerPositionModelName: {
    english: "playerPosition",
    persian: "موقعیت بازیکن",
  },
  reservedTeamNameModelName: {
    english: "reservedTeamName",
    persian: "نام تیم رزرو شده",
  },
  teamModelName: {
    english: "team",
    persian: "تیم",
  },
  requestToCreatePlayerModelName: {
    english: "requestToCreatePlayer",
    persian: "درخواست ساخت بازیکن",
  },
  userModelName: {
    english: "user",
    persian: "کاربر",
  },
  playerModelName: {
    english: "player",
    persian: "بازیکن",
  },
  coinPlanModelName: {
    english: "coinPlan",
    persian: "طرح های سکه",
  },
  gymModelName: {
    english: "gym",
    persian: "باشگاه تمرین",
  },
}

module.exports = {
  paginationTakeItemsCount,
  gameSettings,
  modelName,
}
