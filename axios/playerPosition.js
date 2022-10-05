const { axiosInstance } = require("./axios")

const main = async () => {
  await axiosInstance.post("/admin/player-position", {
    major: "Goalkeaper",
    manor: "No",
  })
  // Defender
  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Left",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "One",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Two",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Three",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Right",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Defender",
    manor: "Middle",
  })
  // Midfielder
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Left",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "One",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Two",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Three",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Right",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Midfielder",
    manor: "Middle",
  })
  // Attacker
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Left",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "One",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Two",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Three",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Right",
  })
  await axiosInstance.post("/admin/player-position", {
    major: "Attacker",
    manor: "Middle",
  })
}

main()
