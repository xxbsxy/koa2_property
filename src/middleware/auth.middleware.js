const { PUBILC_KEY } = require('../app/key')
const errorType = require('../constants/error-type')
const { checkLogin } = require('../services/auth.service')
const jwt = require('jsonwebtoken')
const { md5Password } = require('../utils/handle-password')

// 验证用户登录
const verifyLogin = async (ctx, netx) => {
  // 获取用户名密码
  let { username, password } = ctx.request.body
  password = md5Password(password)

  // 数据库查找用户名密码是否正确
  const res = await checkLogin(username, password)
  if (res) {
    ctx.user = { id: res.id, username }
    await netx()
  } else {
    // 发出错误信息
    const error = new Error(errorType.USERNAME_OR_PASSWORD_IS_ERROR)
    ctx.app.emit('error', error, ctx)
  }
}

// 验证token
const verifyAuth = async (ctx, next) => {
  console.log('验证token的中间件')
  // 用户登录不需要验证token
  if (ctx.path === '/login') {
    await next()
    return
  }
  // 获取token
  const authorization = ctx.header.authorization
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
    return
  }
  const token = authorization.replace('Bearer ', '')
  // 验证token
  try {
    const res = jwt.verify(token, PUBILC_KEY, {
      algorithms: ['RS256']
    })
    console.log(res)
    ctx.user = res
    await next()
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}
