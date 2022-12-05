const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const { verifyAuth } = require('../middleware/auth.middleware')
const useRoutes = require('../router')
const handleError = require('./error.handle')
const cors = require('koa2-cors')
require('./database')

const app = new Koa()

// 开启cors
app.use(cors())

// 解析body参数
app.use(bodyparser())

// 验证token
app.use(verifyAuth)

// 动态注册路由
useRoutes(app)

// 监听错误
app.on('error', handleError)

module.exports = app
