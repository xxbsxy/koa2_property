const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const { verifyAuth } = require('../middleware/auth.middleware')
const useRoutes = require('../router')
const handleError = require('./error.handle')

require('./database')

const app = new Koa()

app.use(bodyparser())

// 验证token
app.use(verifyAuth)

// 动态注册路由
useRoutes(app)

// 监听错误
app.on('error', handleError)

module.exports = app
