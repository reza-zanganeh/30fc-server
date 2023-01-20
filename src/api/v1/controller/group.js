const { Ok, BadRequest } = require("../helpers/HttpResponse")
const { modelName } = require("../../../config/Constant")
const {
  teamModelName,
  groupModelName,
  groupMemberModelName,
  groupPostModelName,
  groupPostCommentModelName,
} = modelName
const {
  internalServerErrorHandler,
  resposeHandler,
} = require("../helpers/responseHandler")
const {
  createNewGroup,
  searchOnGrpupsBaseOnName,
  getSortedGroupsBaseOnName,
  joinToTheGroup,
  likePostOnGroup,
  disLikePostOnGroup,
  getGroupMembers,
} = require("../prismaQuery/group")
const { createError } = require("../helpers/Functions")
const {
  createPrismaQueryPool,
  addPrismaQueryToPool,
  updateWithoutExecute,
  prismaTransaction,
  readOne,
  remove,

  update,
  createWithoutExecute,
  create,
  readWithPagination,
} = require("../helpers/prisma")
const { getCostOfCreatingGroupFromRedis } = require("../services/redis")
const { getPresignedUrlToUploadGroupPostPicture } = require("../services/cloud")

// create group with silver golde diamond user
module.exports.createGroup = async (req, res, next) => {
  try {
    // name , bio
    const { name, bio, accessType } = req.body
    const { id: teamId, coinCount } = req[teamModelName.english]
    const costOfCreatingGroup = await getCostOfCreatingGroupFromRedis()
    if (coinCount < costOfCreatingGroup)
      return next(
        createError(
          BadRequest(
            `هزینه ساخت گروه${costOfCreatingGroup} می باشد . موجودی سکه شما کافی نمی باشد`
          )
        )
      )
    const createGroupPrismaPoolIndedx = createPrismaQueryPool()
    addPrismaQueryToPool(
      createGroupPrismaPoolIndedx,
      createNewGroup(name, bio, accessType, teamId)
    )
    addPrismaQueryToPool(
      createGroupPrismaPoolIndedx,
      updateWithoutExecute(
        teamModelName.english,
        { id: +teamId },
        { coinCount: coinCount - costOfCreatingGroup }
      )
    )

    const [group] = await prismaTransaction(createGroupPrismaPoolIndedx)
    resposeHandler(res, group, Ok({ operationName: "ایجاد گروه جدید" }))
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("name"))
      return next(
        createError(
          BadRequest(
            "نام انتخابی شما برای گروه موجود می باشد لطفا نام دیگری انتخاب کنید"
          )
        )
      )

    internalServerErrorHandler(next, error)
  }
}

// TODO : In front complate
// change profile picture

// add deputy
module.exports.addDeputyToGroup = async (req, res, next) => {
  try {
    const { deputyId, groupId } = req.body
    const { deputyCount } = req[groupModelName.english]
    // check deputy count < 2
    if (deputyCount >= 2)
      return next(
        createError(BadRequest("گروه بیشتر از دو معاون نمی تواند داشته باشد"))
      )

    const member = await readOne(groupMemberModelName.english, {
      teamId: +deputyId,
      groupId: +groupId,
    })

    if (!member)
      return next(
        createError(
          BadRequest("شناسه تیم انتخاب شده بعنوان معاون معتبر نمی باشد")
        )
      )

    if (member.role === "Deputy")
      return next(
        createError(
          BadRequest(
            "تیم انتخاب شده بعوان معاون گروه در حال حاضر معاون گروه می باشد"
          )
        )
      )

    await update(
      groupMemberModelName.english,
      { id: deputyMember.id },
      { role: "Deputy" }
    )

    resposeHandler(
      res,
      {},
      Ok({ operationName: "انتخاب عضو گروه بعنوان معاون گروه" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// remove deputy
module.exports.dismissalFromTheDeputyGroup = async (req, res, next) => {
  try {
    const { deputyId } = req.params
    const { groupId } = req[groupModelName.english]
    const member = await readOne(groupMemberModelName.english, {
      teamId: +deputyId,
      groupId: +groupId,
    })

    if (!member)
      return next(createError(BadRequest("معاون با شناسه مورد نظر یافت نشد")))

    if (member.role !== "Deputy")
      return next(createError(BadRequest("تیم انتخاب شده معاون گروه نمی باشد")))

    await update(
      groupMemberModelName.english,
      { id: member.id },
      { role: "Normal" }
    )

    resposeHandler(res, {}, Ok({ operationName: "عزل کردن معاون گروه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}
// Expulsion of the user
module.exports.blockMemberByAdmin = async (req, res, next) => {
  try {
    const { groupId } = req.body
    const { memberId } = req.params
    const member = await readOne(groupMemberModelName.english, {
      groupId: +groupId,
      teamId: +memberId,
    })
    if (!member)
      return next(createError(BadRequest("این تیم عضو گروه شما نمی باشد")))
    await update(
      groupMemberModelName.english,
      { id: member.id },
      { isDeported: true }
    )
    resposeHandler(res, {}, Ok({ operationName: "مسدود کردن عضو گروه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// see content just with members
module.exports.joinToTheGroup = async (req, res, next) => {
  try {
    const { id: groupId } = req[groupModelName.english]
    const { id: teamId } = req[teamModelName.english]
    const member = await readOne(groupMemberModelName.english, {
      teamId,
      groupId,
    })

    if (member?.isDeported)
      return next(
        createError(
          BadRequest(
            "ادمین گروه شما را مسدود کرده است و شما دیگر نمی توانید عضو شوید"
          )
        )
      )

    if (member)
      return next(createError(BadRequest("شما عضو این گروه می باشید")))

    await joinToTheGroup(groupId, teamId)

    resposeHandler(res, {}, Ok({ operationName: "عضویت در گروه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.leftTheGroup = async (req, res, next) => {
  try {
    const { id: teamId } = req[teamModelName.english]
    const { id: groupId } = req[groupModelName.english]
    const member = await readOne(groupMemberModelName.english, {
      teamId,
      groupId,
    })

    await remove(groupMemberModelName.english, {
      id: member.id,
    })
    resposeHandler(res, {}, Ok({ operationName: "خروج از گروه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// add comment
module.exports.commentOnGroupPost = async (req, res, next) => {
  try {
    const { text, postId } = req.body
    const { id: teamId } = req[teamModelName.english]
    const { id: groupId } = req[groupModelName.english]

    // check post exists on group
    const post = await readOne(groupPostModelName, { id: +postId, groupId })

    if (!post)
      return next(
        createError(BadRequest("این پست مربوط گروه مورد نظر نمی باشد"))
      )
    // increase commentsCount in post
    const commentOnGroupPostPrismaPoolIndex = createPrismaQueryPool()

    addPrismaQueryToPool(
      commentOnGroupPostPrismaPoolIndex,
      createWithoutExecute(groupPostCommentModelName.english, {
        text,
        postId: +postId,
        teamId: +teamId,
      })
    )

    addPrismaQueryToPool(
      commentOnGroupPostPrismaPoolIndex,
      updateWithoutExecute(
        groupPostModelName.english,
        { id: postId },
        { commentsCount: post.commentsCount + 1 }
      )
    )

    const [comment] = await prismaTransaction(commentOnGroupPostPrismaPoolIndex)

    resposeHandler(req, comment, Ok("ارسال کامنت رو پست در گروه"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// TODO : postCountInToDay = 0 in every 24 hours
// send post on groups :  picture text 3 on day
module.exports.sendPostToGroup = async (req, res, next) => {
  try {
    const { title, context, fileName } = req.body
    const { id: groupId, postCountInToDay } = req[groupModelName.english]

    if (postCountInToDay >= 3)
      return next(createError(BadRequest("فقط 3 پست در روز می توان ارسال کرد")))

    const { Key, fields, url } = await getPresignedUrlToUploadGroupPostPicture(
      fileName
    )

    const sendPostToGroupPrismaPoolIndex = createPrismaQueryPool()

    addPrismaQueryToPool(
      sendPostToGroupPrismaPoolIndex,
      createWithoutExecute(groupPostModelName.english, {
        title,
        context,
        pictureUrl: Key,
        groupId,
      })
    )

    addPrismaQueryToPool(
      sendPostToGroupPrismaPoolIndex,
      updateWithoutExecute(
        groupModelName.english,
        { id: groupId },
        { postCountInToDay: postCountInToDay + 1 }
      )
    )

    const [post] = await prismaTransaction(sendPostToGroupPrismaPoolIndex)

    resposeHandler(res, { ...post, url, fields }, Ok("ارسال پست در گروه"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// like post with memeber
module.exports.likePostOnGroup = async (req, res, next) => {
  try {
    const { id: postId } = req.params
    const { id: teamId } = req[teamModelName.english]
    const { id: groupId } = req[groupModelName.english]

    // check post exists on group
    const post = await readOne(groupPostModelName, { id: +postId, groupId })

    if (!post)
      return next(
        createError(BadRequest("این پست مربوط گروه مورد نظر نمی باشد"))
      )
    // increase commentsCount in post
    await likePostOnGroup(+postId, teamId, post.likeCount)

    resposeHandler(req, {}, Ok("ارسال کامنت رو پست در گروه"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// dis like post with memeber
module.exports.disLikePostOnGroup = async (req, res, next) => {
  try {
    const { id: postId } = req.params
    const { id: teamId } = req[teamModelName.english]
    const { id: groupId } = req[groupModelName.english]

    // check post exists on group
    const post = await readOne(groupPostModelName, { id: +postId, groupId })

    if (!post)
      return next(
        createError(BadRequest("این پست مربوط گروه مورد نظر نمی باشد"))
      )
    // increase commentsCount in post
    await disLikePostOnGroup(+postId, teamId, post.disLikeCount)

    resposeHandler(req, {}, Ok("ارسال کامنت رو پست در گروه"))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// search on groups base on name
module.exports.searchOnGroupsBaseOnName = async (req, res, next) => {
  try {
    console.log(req.query)
    const { key } = req.query
    const groups = await searchOnGrpupsBaseOnName(key)
    resposeHandler(
      res,
      groups,
      Ok({ operationName: "جستجو گروه ها بر اساس نام گروه" })
    )
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

module.exports.getGroups = async (req, res, next) => {
  try {
    const { page, sort } = req.query
    let orderBy
    if (sort === "mostMember")
      orderBy = {
        members: {
          _count: "asc",
        },
      }
    else if (sort === "newly") {
      orderBy = {
        dateOfEstablishment: "asc",
      }
    } else if (sort === "alphabet") {
      orderBy = {
        name: "asc",
      }
    }

    const groups = await readWithPagination(
      groupModelName.english,
      page,
      orderBy
    )
    resposeHandler(res, groups, Ok({ operationName: "خواندن گروه ها" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// get member of group
module.exports.getMemberOfGroup = async (req, res, next) => {
  try {
    const { id: groupId } = req[groupModelName.english]

    const members = await getGroupMembers(groupId)

    resposeHandler(res, members, Ok({ operationName: "خواندن اعضای گروه" }))
  } catch (error) {
    internalServerErrorHandler(next, error)
  }
}

// get 4 most liked + commented post

// get 4 last post

// get admin and deputy

// get all post base on alphabet 4
