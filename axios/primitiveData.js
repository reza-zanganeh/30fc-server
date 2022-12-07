const { axiosInstance } = require("./axios")

const stop = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000)
  })
}

const addName = async () => {
  let i = 51
  while (i <= 100) {
    const res = await axiosInstance.post("/admin/primitive-player-name", {
      name: `رضا ${i}`,
    })
    if (res) i += 1
    else await stop(10)
  }
}

const addReservedName = async (name) => {
  await axiosInstance.post("/admin/reserved-team-name", {
    name,
  })
}

addReservedName("بارسلونا")
addReservedName("اتلتیکو مادرید")
addReservedName("رئال مادرید")
addReservedName("استقلال")
addReservedName("پرسپولیس")
addReservedName("تراکتور")
addReservedName("پدیده")

// addName()
