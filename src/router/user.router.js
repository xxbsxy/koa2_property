const Router = require('koa-router')
const { addUser, updateUser, deleteUser, getUserList } = require('../controller/user.controller')
const { verifyUsername, handlePassword } = require('../middleware/user.middleware')
const router = new Router()

router.prefix('/user')

// 获取全部用户
router.get('/', getUserList)

// 添加用户
router.post('/', verifyUsername, handlePassword, addUser)
// 更新用户
router.put('/:userId', updateUser)
// 删除用户
router.delete('/:userId', deleteUser)
module.exports = router
