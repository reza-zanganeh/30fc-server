const { createError } = require("../helpers/Functions")
const {
  InternalServerError,
  Ok,
  BadRequest,
} = require("../helpers/HttpResponse")
const { createPlayer } = require("../dataLogic/player")
const { resposeHandler } = require("../helpers/responseHandler")
const { gameSettings } = require("../../../config/Constant")
const { maximumPalyerCount } = gameSettings
const { getPresignedUrlToUploadPlayerFacePiture } = require("../services/cloud")
// user

// admin
// create player

// buy player from market

// put player on market
// if admin
// else
// check owner of team
