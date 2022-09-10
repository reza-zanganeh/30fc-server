const { createError } = require("../helpers/Functions")
const { InternalServerError, Ok } = require("../helpers/HttpResponse")
const { createPlayer } = require("../dataLogic/player")
const { resposeHandler } = require("../helpers/responseHandler")
const { getPresignedUrlToUploadPlayerFacePiture } = require("../services/cloud")
// admin
// create player
module.exports.createPlayerByAdmin = async (req, res, next) => {
  try {
    const {
      name,
      fileName: facePicture,
      age,
      positionId,
      nationality,
      // power
      spead,
      controll,
      pass,
      flexibility,
      stamina,
      technique,
      shoot,
      drible,
      focus,
      experience,
      //
      price,
    } = req.body

    const { Key, fields, url } = await getPresignedUrlToUploadPlayerFacePiture(
      facePicture
    )

    const player = await createPlayer({
      name,
      age: +age,
      // TODO : clalc salary
      salary: 100,
      // power
      controll: +controll,
      technique: +technique,
      flexibility: +flexibility,
      drible: +drible,
      experience: +experience,
      focus: +focus,
      pass: +pass,
      shoot: +shoot,
      spead: +spead,
      stamina: +stamina,
      facePictureUrl: Key,
      positionId: +positionId,
      teamId: null,
      nationality,
      status: "INMARKET",
      price: +price,
    })

    resposeHandler(res, { ...player, url, fields }, Ok("ساخت بازیکن"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}

// buy player from market

// put player on market
// if admin
// else
// check owner of team
