const Router = require('koa-router')
const {
  getProperty,
  updateProperty,
  updatePropertyStatus
} = require('../controller/property.controller')

const router = new Router()
router.prefix('/property')

// 获取物业费信息
router.get('/', getProperty)

// 获取物业费信息
router.put('/:id', updateProperty)

// 获取物业费信息
router.put('/status/:id', updatePropertyStatus)

module.exports = router
