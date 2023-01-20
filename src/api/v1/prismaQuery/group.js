const { PrismaClient } = require("@prisma/client")
const { group, groupMember, groupPost } = new PrismaClient()
module.exports.createNewGroup = (name, bio, accessType, adminId) => {
  try {
    return group.create({
      data: {
        name,
        bio,
        access: accessType,
        members: {
          create: {
            role: "Admin",
            teamId: adminId,
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.searchOnGrpupsBaseOnName = async (key) => {
  try {
    const groups = await group.findMany({
      where: {
        name: {
          contains: key,
        },
      },
    })
    return groups
  } catch (error) {
    throw error
  }
}

module.exports.joinToTheGroup = async (groupId, teamId) => {
  try {
    await groupMember.create({ data: { groupId, teamId } })
  } catch (error) {
    throw error
  }
}

module.exports.likePostOnGroup = async (postId, teamId, likeCount) => {
  try {
    return await groupPost.update({
      where: {
        id: postId,
      },
      data: { like: { connect: { id: teamId } }, likeCount: likeCount + 1 },
    })
  } catch (error) {
    throw error
  }
}

module.exports.disLikePostOnGroup = async (postId, teamId, disLikeCount) => {
  try {
    return await groupPost.update({
      where: {
        id: postId,
      },
      data: {
        dislike: { connect: { id: teamId } },
        disLikeCount: disLikeCount + 1,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports.getGroupMembers = async (groupId) => {
  try {
    const members = await group.findFirst({
      where: { id: groupId },
      include: {
        members: {
          select: {
            team: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    return members
  } catch (error) {
    throw error
  }
}
