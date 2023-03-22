const Router = require('koa-router')
const { getDataList } = require('../controller/data.controller.js')

const router = new Router()
router.prefix('/data')

// 获取物业费信息
router.get('/', getDataList)

module.exports = router
