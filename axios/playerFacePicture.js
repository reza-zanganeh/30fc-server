const { axiosInstance } = require("./axios")
const axios = require("axios").default
const path = require("path")
const fs = require("fs")
const FormData = require("form-data")
// player face picture
const addPlayerFacePicture = async (fileName, fileAddress) => {
  try {
    const response = await axiosInstance.post("/admin/player-face-picture", {
      fileSize: 50,
      fileType: "jpeg",
      fileName,
      isSpecial: false,
    })
    // const data = new FormData()
    // data.append("key", response.data.data.fields.key)
    // data.append("X-Amz-Algorithm", response.data.data.fields["X-Amz-Algorithm"])
    // data.append(
    //   "X-Amz-Credential",
    //   response.data.data.fields["X-Amz-Credential"]
    // )
    // data.append("X-Amz-Date", response.data.data.fields["X-Amz-Date"])
    // data.append("acl", "public-read")
    // data.append("policy", response.data.data.fields["Policy"])
    // data.append("X-Amz-Signature", response.data.data.fields["X-Amz-Signature"])
    // data.append("file", fs.createReadStream(fileAddress))

    // console.log(response.data)
    // var config = {
    //   method: "post",
    //   url: response.data.data.url,
    //   headers: {
    //     ...data.getHeaders(),
    //   },
    //   data: data,
    // }

    // const uploadResponse = await axios(config)
  } catch (error) {
    console.log(error)
  }
}

const stop = async (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000)
  })
}

const getPlayerFacePicture = async () => {
  await axiosInstance.get("/admin/player-face-picture")
}

const addPlayerFacePictures = async () => {
  for (let i = 1; i <= 21; i++) {
    await addPlayerFacePicture(
      `${i}.jpeg`,
      path.join(__dirname, "..", "..", "player face picture", `${i}.jpeg`)
    )
    await stop(1)
  }
}

addPlayerFacePictures()
