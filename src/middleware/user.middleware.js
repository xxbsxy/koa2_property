const { hasUsername } = require('../services/user.service')
const errorType = require('../constants/error-type')
const { md5Password } = require('../utils/handle-password')
// 检验用户名是否已存在
const verifyUsername = async (ctx, next) => {
  const { username } = ctx.request.body
  const res = await hasUsername(username)
  if (res) {
    const error = new Error(errorType.USERNAME_IS_EXIST)
    ctx.app.emit('error', error, ctx)
  } else {
    await next()
  }
}
// 对密码进行加密
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}
module.exports = {
  handlePassword,
  verifyUsername
}
