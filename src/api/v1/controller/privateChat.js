const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
const { modelName } = require("../../../config/Constant")
const { readOne, create, readAll } = require("../helpers/prisma")
const { createError } = require("../helpers/Functions")
const { BadRequest, Ok, emptyMesssage } = require("../helpers/HttpResponse")
const {
  getPrivateChatMessages,
  markAsReadmessages,
} = require("../prismaQuery/privateChat")
const { teamModelName, privateChatModelName, privateChatMessageModelName } =
  modelName
// create or startr private chat
module.exports.startPrivateChat = async (req, res, next) => {
  try {
    const { teamTwoId } = req.body
    const { id: teamOneId } = req[teamModelName.english]

    const privateChat = await readOne(privateChatModelName.english, {
      teamOneId,
      teamTwoId: +teamTwoId,
    })

    if (privateChat)
      return next(
        createError(
          BadRequest(
            "چت خصوصی بین شما و تیم مورد نظر قبلا ایجاد شده است شما می توانید به قسمت چت های خصوصی من مراجحه کنید"
          )
        )
      )

    const newPrivateChat = await create(privateChatModelName.english, {
      teamOneId,
      teamTwoId: +teamTwoId,
    })

    resposeHandler(res, newPrivateChat, Ok({ operationName: "ساخت چت خصوصی" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// send message
module.exports.sendMessageOnPrivateChat = async (req, res, next) => {
  try {
    const { message } = req.body
    const { id: senderId } = req[teamModelName.english]
    const {
      id: privateChatId,
      teamOneId,
      teamTwoId,
    } = req[privateChatModelName.english]

    const messageData = {
      message,
      privateChatId,
      isReadWithTeamOne: teamOneId === senderId,
      isReadWithTeamTwo: teamTwoId === senderId,
    }

    await create(privateChatMessageModelName.english, messageData)

    resposeHandler(res, {}, emptyMesssage())
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// get messages
module.exports.getPrivateChatMessages = async (req, res, next) => {
  try {
    const { id: privateChatId } = req[privateChatModelName.english]

    const messages = await getPrivateChatMessages(privateChatId)

    resposeHandler(
      res,
      messages,
      Ok({ operationName: "دریافت پیام های چت خصوصی" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// get private chats
module.exports.getPrivateChats = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]

    const startedPrivateChat = await readAll(privateChatModelName.english, {
      teamOneId: teamId,
    })
    const recievedPrivateChat = await readAll(privateChatModelName.english, {
      teamTwoId: teamId,
    })

    resposeHandler(
      res,
      { startedPrivateChat, recievedPrivateChat },
      Ok({ operationName: "دریافت چت های خصوصی" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// remove private chat
// read meassage with array of ids
module.exports.markAsReadMessages = async (req, res, next) => {
  try {
    const { messageIds } = req.body
    const { id: teamId } = req[teamModelName.english]
    const { teamOneId } = req[privateChatModelName.english]
    const messageArrayIds = messageIds.split(",")
    if (!messageArrayIds || messageArrayIds.length <= 0)
      return next(
        createError(
          BadRequest("شناسه های پیام باید توسط ( , ) از یکدیگر جدا شده باشند")
        )
      )

    const isReadWithTeamOne = teamId === teamOneId
    await markAsReadmessages(messageArrayIds, isReadWithTeamOne)
    resposeHandler(res, {}, Ok("علامت زدن پیام ها بعنوان خوانده شده"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
