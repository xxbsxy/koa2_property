const Router = require('koa-router')
const {
  getRepairList,
  addRepair,
  deleteRepair,
  updateRepair,
  getRepairById
} = require('../controller/repair.controller')
const router = new Router()

router.prefix('/repair')

// 添加报修
router.post('/', addRepair)

// 更新报修
router.put('/:id', updateRepair)

// 删除报修
router.delete('/:id', deleteRepair)

// 获取全部报修
router.get('/', getRepairList)

// 获取单个用户投诉
router.get('/:id', getRepairById)
module.exports = router
