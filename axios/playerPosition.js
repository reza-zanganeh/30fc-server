const { axiosInstance } = require("./axios")
const stop = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000)
  })
}
const main = async () => {
  // await axiosInstance.post("/admin/player-position", {
  //   major: "Goalkeaper",
  //   manor: "No",
  // })
  // await stop(2)
  // // Defender
  // await axiosInstance.post("/admin/player-position", {
  //   major: "Defender",
  //   manor: "Left",
  // })
  // await stop(2)
  // await axiosInstance.post("/admin/player-position", {
  //   major: "Defender",
  //   manor: "One",
  // })
  // await stop(2)

  // await axiosInstance.post("/admin/player-position", {
  //   major: "Defender",
  //   manor: "Two",
  // })
  // await stop(2)

  // await axiosInstance.post("/admin/player-position", {
  //   major: "Defender",
  //   manor: "Three",
  // })
  // await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Right",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Middle",
  })
  await stop(2)

  // Midfielder
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Left",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "One",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Two",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Three",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Right",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Middle",
  })
  await stop(2)

  // Attacker
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Left",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "One",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Two",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Three",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Right",
  })
  await stop(2)

  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Middle",
  })
}

main()
