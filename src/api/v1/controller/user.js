const { findUser } = require("../dataLogic/user")
module.exports.getUserInformationWithToken = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = findUser({ id: +userId })

    resposeHandler(res, user, Ok("دریافت اطلاعات کاربر"))
  } catch (error) {
    next(createError(InternalServerError()))
  }
}
