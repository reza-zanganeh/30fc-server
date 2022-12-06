const { axiosInstance } = require("./axios")

const createGoldenCupByAdmin = async () => {
  axiosInstance.post("/golden-cup/", {
    teamCount: 32,
    registerCostInToman: 1200,
    registerationOpenForSilverTeam: false,
    registerationOpenForGoldenTeam: true,
    registerationOpenForDiamondTeam: true,
  })
}

const registerAtGoldenCup = async () => {
  axiosInstance.post(
    "/golden-cup/register",
    { teamId: 43 },
    {
      headers: {
        accesstoken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsInJvbGUiOiJOb3JtYWwiLCJpc0Jsb2NrIjpmYWxzZSwiaWF0IjoxNjY4OTcxMTExLCJleHAiOjE2NjkwNTc1MTF9.pYHPs-pVqZAGn-l6JWNUoZZtLvP6Vgy_tgnsYK0gPS4",
      },
    }
  )
}

registerAtGoldenCup()
