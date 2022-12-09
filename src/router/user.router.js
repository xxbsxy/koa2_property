const Router = require('koa-router')
const {
  addUser,
  updateUser,
  deleteUser,
  getUserList,
  queryUser
} = require('../controller/user.controller')
const { verifyUsername, handlePassword } = require('../middleware/user.middleware')
const router = new Router()

router.prefix('/user')

// 获取全部用户
router.get('/', getUserList)
// 根据用户名查询用户
router.get('/:username', queryUser)
// 添加用户
router.post('/', verifyUsername, handlePassword, addUser)
// 更新用户
router.put('/:userId', updateUser)
// 删除用户
router.delete('/:userId', deleteUser)
module.exports = router
