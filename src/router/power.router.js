const Router = require('koa-router')
const { getPower, updatePower, updatePowerStatus } = require('../controller/power.controller.js')

const router = new Router()
router.prefix('/power')

// 获取物业费信息
router.get('/', getPower)

// 修改水电信息
router.put('/:id', updatePower)

// 获取物业费信息
router.put('/status/:id', updatePowerStatus)

module.exports = router
