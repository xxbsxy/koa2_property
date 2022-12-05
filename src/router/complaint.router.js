const Router = require('koa-router')
const {
  addComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaintList,
  getComplaintById
} = require('../controller/complaint.controller')
const router = new Router()

router.prefix('/complaint')

// 添加投诉
router.post('/', addComplaint)

// 更新投诉
router.put('/:id', updateComplaint)

// 删除投诉
router.delete('/:id', deleteComplaint)

// 获取全部投诉
router.get('/', getComplaintList)

// 获取单个用户投诉
router.get('/:id', getComplaintById)
module.exports = router
