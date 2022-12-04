const Router = require('koa-router')
const { login } = require('../controller/auth.controller')
const { verifyLogin } = require('../middleware/auth.middleware')

const router = new Router()

router.post('/login', verifyLogin, login)

router.get('/text', (ctx, next) => {
  ctx.body = '授权成功'
})

module.exports = router
