const errorType = require('../constants/error-type')

const handleError = (error, ctx) => {
  let status = 0
  let msg = ''
  switch (error.message) {
    case errorType.USERNAME_OR_PASSWORD_IS_ERROR:
      status = 400
      msg = '用户名或密码错误'
      break

    case errorType.USERNAME_IS_EXIST:
      status = 400
      msg = '用户名已存在'
      break

    case errorType.UNAUTHORIZATION:
      status = 401
      msg = '无效的token'
      break

    default:
      status = 404
      msg = 'Not Found'
      break
  }
  ctx.status = status
  ctx.body = { code: status, msg }
}

module.exports = handleError
