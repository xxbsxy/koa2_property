const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/key')
class AuthController {
  async login(ctx, next) {
    const { id, username } = ctx.user
    // sign方法第一个参数是需要加密的对象 第二个是加密的私钥,第三个是配置对象
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 过期时间
      algorithm: 'RS256' // 加密算法 RS256为非对称加密
    })
    ctx.body = {
      data: {
        id,
        username,
        token
      },
      code: 200,
      msg: '登录成功'
    }
  }
}

module.exports = new AuthController()
