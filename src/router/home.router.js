const Router = require('koa-router')
const {
  getHome,
  addHome,
  deleteHome,
  updateHome,
  getHomeById
} = require('../controller/home.controller')

const router = new Router()
router.prefix('/home')

// 添加一个房子信息
router.post('/', addHome)

// 删除一个房子信息
router.delete('/:id', deleteHome)

// 更新一个房子信息
router.put('/:id', updateHome)

// 获取单个用户房子信息
router.get('/:id', getHomeById)

// 获取全部房子信息
router.get('/', getHome)

module.exports = router
